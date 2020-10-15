import { ReviewService } from './../../shared/services/review.service';
import { UserService } from './../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/shared/models/movie';
import { User } from './../../shared/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-add-edit-review',
  templateUrl: './add-edit-review.component.html',
  styleUrls: ['./add-edit-review.component.scss']
})
export class AddEditReviewComponent implements OnInit, OnDestroy {
  form: FormGroup
  formValues: any
  submitting: false
  hasError: false
  errorMsg: string
  currentUser: User
  movie: Movie
  movieImg: string
  // static Review Rating List
  reviewRatings = [
    {id: 1, val:1},
    {id: 2, val:2},
    {id: 3, val:3},
    {id: 4, val:4},
    {id: 5, val:5}
  ]
  isNew = false
  isEdit = false
  private subs = new Subscription()
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private movieService: MovieService,
    private reviewService: ReviewService
  ) {
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
    this.handleSubs()
    this.createFormControls()
    this.createForm()
  }

  handleSubs() {
    this.route.params.subscribe(data => {
      if (data && data.id) {
        this.retrieveMovie(data.id)
      }
    })
  }

  retrieveMovie(id: number) {
    const params = {id: id}
    this.subs.add(
      this.movieService.getMovieById(params).subscribe(data => {
        if (data && data.movie) {
          this.movie = data
          if (this.movie.image) {
            this.movieImg = this.movie.image
          } else {
            this.movieImg = null
          }
        }
      }, error => {
          if (error) {
            console.error(error)
          }
        })
    )
  }

  createFormControls() {
    this.formValues = {
      starRating: [null, Validators.required],
      body: ['', Validators.required]
    }
  }

  createForm() {
    this.form = this.fb.group(this.formValues)
  }

  setDefaultPic() {
    this.movieImg = 'assests/images/batman-vs-godzilla.png'
  }

  submitForm() {
    this.hasError = false
    this.submitting = true
    if (this.form.invalid) {
      this.hasError = true
      this.submitting = false
      return
    }
  }

  cancel() {
    this.form.reset
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}
