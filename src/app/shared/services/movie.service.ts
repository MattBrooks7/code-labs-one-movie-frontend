import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import * as S3 from 'aws-sdk/clients/s3';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieApi: string;
  constructor(
    private http: HttpClient
  ) {
    this.movieApi = `$(environment.apiUrl)api/v1/movies`
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>('${this.movieApi}/index')
  }

  getMovieById(params) {
    return this.http.get<any>('${this.movieApi}/show?id=${params.id}')
  }

  getUploadCredentials() {
    return this.http.get<any>('${this.movieApi}/get_upload_credentials')
  }

  createMovie(params) {
    return this.http.post<any>('${this.movieApi}/create', params)
  }

  
uploadMovieImage(file, name, accessKey, secretKey) {
  const buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/,''), 'base64')
  const bucket = new S3({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: 'us-east-2',
  });
  const params = {
    Bucket: 'code-labs-one-movie-images',
    Key: 'images/' + name,
    Body: buf,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: 'image/png'
  };
  bucket.upload(params, function (err, data) {
    if (err) {
      console.log('There was an error uploading your file: ', err)
      return { success: false, error: err  }
    } else {
      console.log('Successfully uploaded file.', data)
      return { success: true, file: data.location }
    }
  })
}

}
