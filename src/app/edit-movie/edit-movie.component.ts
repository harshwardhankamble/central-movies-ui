import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';
import axios from 'axios';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  userId: any

  movieForm: FormGroup = this.formBuilder.group({
    movieName: '',
    posterImage: '',
    language: '',
    totalHours: 0,
    movieDescription: '',
    trailerUrl: '',
    releasedDate: '',
    movieStatus: '',
    genre: '',
    movieRating: 0,
    casts: this.formBuilder.array([])
  })

  paramMovieId: any

  movieData: any

  starCasts = []

  constructor(private router: Router, private authenticateService: AuthenticateService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.userId = this.authenticateService.getUserIdFromToken()

    route.params.subscribe(param => {
      this.paramMovieId = param['id']
    })    
  }

  ngOnInit(): void {
    axios.get(Constant.getMoviesUrl + '/' + this.paramMovieId, { params: { userId: this.userId } })
      .then(response => {
        this.movieData = response.data
      
        this.movieForm = this.formBuilder.group({
          movieName: this.movieData['movieName'],
          posterImage: this.movieData['posterImage'],
          language: this.movieData['language'],
          totalHours: this.movieData['totalHours'],
          movieDescription: this.movieData['movieDescription'],
          trailerUrl: this.movieData['trailerUrl'],
          releasedDate: this.movieData['releasedDate'],
          movieStatus: this.movieData['movieStatus'],
          genre: this.movieData['genre'],
          movieRating: this.movieData['movieRating'],
          casts: this.formBuilder.array(this.movieData['casts'])
        })

        // for(let i=0;i<this.movieData['casts'].length;i++) {
        //   this.getCasts().push(this.editCast(this.movieData['casts']['castName'], this.movieData['casts']['castDescription'], this.movieData['casts']['castRating']))
        // }
      })
  }

  getCasts() {
    return this.movieForm.get('casts') as FormArray
  }

  newCast() {
    return this.formBuilder.group({
      castName: '',
      castRating: 0,
      castDescription: ''
    })
  }

  editCast(castName: string, castDescription: string, castRating: number) {
    return this.formBuilder.group({
      castName: castName,
      castRating: castRating,
      castDescription: castDescription
    })
  }

  addNewCast() {
    this.getCasts().push(this.newCast())
  }

  addNewMovie() {
    axios.put(Constant.getMoviesUrl + '/' + this.paramMovieId, this.movieForm.value, { params: { userId: this.userId } })
      .then(response => {
        this.router.navigate(['home'])
      })
      .catch(error => {
        this.router.navigate(['error'], { state: { error: error.response.data } })
      })
  }
}