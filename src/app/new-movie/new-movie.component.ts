import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Movie } from 'src/assets/data/Movie';
import { Constant } from 'src/assets/data/constant/Constant';
import { AuthenticateService } from '../service/authenticate.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {

  userId: any

  movieForm: FormGroup

  constructor(private router: Router, private authenticateService: AuthenticateService, private formBuilder: FormBuilder) { 
    this.movieForm = this.formBuilder.group({
      movieName: '',
      posterImage: '',
      language: '',
      totalHours: 0,
      movieDescription: '',
      trailerUrl: '',
      releasedDate: '',
      movieStatus: 0,
      genre: 0,
      movieRating: 0,
      casts: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()
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

  addNewCast() {
    this.getCasts().push(this.newCast())
  }

  addNewMovie() {
    console.log(this.movieForm.value);
    
    axios.post(Constant.getMoviesUrl, this.movieForm.value, { params: { userId: this.userId } })
      .then(response => {
        this.router.navigate(['home'])
      })
      .catch(error => {
        this.router.navigate(['error'], {state: {error: error.response.data}})
      })
  }
}
