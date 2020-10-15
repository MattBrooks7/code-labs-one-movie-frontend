import { UserService } from './../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../shared/models/user';
import { Review } from './../../shared/models/review';
import { Movie } from 'src/app/shared/models/movie';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.scss']
})
export class MovieReviewsComponent implements OnInit, OnDestroy {
  movie: Movie
  movieImg: string
  avgMovieRating: number
  reviews: Review[] = []
  currentUser: User
  private subs = new Subscription()
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private movieService: MovieService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.route.params.subscribe(movie => {
      if (movie && movie.id) {
        this.retrieveMovieById(movie.id)
      }
    })
  }

  retrieveMovieById(id: number) {
    const params = { id: id}
    this.subs.add(
      this.movieService.getMovieById(params).subscribe(data => {
        if (data && data.movie && data.reviews) {
          this.movie = new Movie(data.movie)
          this.movieImg = this.movie.image
          this.reviews = data.reviews.map(x => new Review(x))
          if (this.reviews.length) {
            this.computeTheAverageReviewRating(this.reviews)
          }
        }
      }, error => {
        if (error) {
          console.log(error)
        }
      })
    )
  }

  computeTheAverageReviewRating(reviews: Review[]) {
    const totalReviews = reviews.length || 0
    let totalRating = 0
    reviews.forEach(x => {
      totalRating += x.rating
    })
    this.avgMovieRating = ( totalRating / totalReviews)
  }

  setDefaultPic() {
    this.movieImg = 'assests/images/batman-vs-godzilla.png'
  }

  routeToWriteReview() {
    this.router.navigate(['reviews/${this.movie.id}/new'])
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
