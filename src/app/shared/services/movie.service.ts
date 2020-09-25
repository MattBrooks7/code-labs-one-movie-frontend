import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieApi: string;
  constructor(
    private http: HttpClient
  ) {
    this.movieApi = '$(environment.apiUrl)api/v1/movies'
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('${this.movieApi}/index')
  }
}
