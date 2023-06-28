import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticateService } from '../service/authenticate.service';
import axios from 'axios';
import { Constant } from 'src/assets/data/constant/Constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-show',
  templateUrl: './new-show.component.html',
  styleUrls: ['./new-show.component.css']
})
export class NewShowComponent implements OnInit {

  showForm: FormGroup

  userId: any

  movies = []

  theatres = []

  screens = []

  constructor(private formBuilder: FormBuilder, private authenticateService: AuthenticateService, private router: Router) {
    this.showForm = this.formBuilder.group({
      showName: '',
      movieId: '',
      theatreId: '',
      startingDate: '',
      showTime: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()

    this.loadMoviesData()
    this.loadTheatresData()
  }

  getShowTimes() {
    return this.showForm.get('showTime') as FormArray
  }

  newShowTime() {
    return this.formBuilder.group({
      screenId: '',
      showDate: '',
      showTime: '',
      showDateTime: '',
      showStatus: ''
    })
  }

  addNewShowTime() {
    this.getShowTimes().push(this.newShowTime());
  }

  removeShowTime(index: number) {
    this.getShowTimes().removeAt(index);
  }

  submitShowData() {
    console.log(this.showForm.value);
    axios.post(Constant.getShowUrl, this.showForm.value, {params: {userId: this.userId}})
    .then(response => {
      this.router.navigate(['home'])
    })
  }

  loadMoviesData() {
    axios.get(Constant.getMoviesUrl, { params: { userId: this.userId } })
      .then((response) => {
        this.movies = response.data;
      })
      .catch((error) => {
        this.router.navigate(['error'], { state: { error: error.response.data } })
      })
  }

  loadTheatresData() {
    axios.get(Constant.getTheatreUrl, { params: { userId: this.userId } })
      .then((response) => {
        this.theatres = response.data;
      })
      .catch((error) => {
        this.router.navigate(['error'], { state: { error: error.response.data } })
      })
  }

  loadScreenData(event: any) {

    let targetId: number = event.target.value

    this.theatres.forEach((theatre: any) => {
      if (theatre['theatreId'] == targetId) {
        this.screens = theatre['screens']
      }
    });
  }
}
