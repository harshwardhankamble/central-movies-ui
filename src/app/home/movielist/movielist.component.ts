import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {

  data = [];

  userId: any = ''

  constructor(private router: Router, private authenticateService: AuthenticateService) { }

  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()
    this.loadMoviesData()
  }

  loadMoviesData() {

    axios.get(Constant.getMoviesUrl, { params: { userId: 1 } })
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        this.router.navigate(['error'], { state: { error: error.response.data } })
      })
  }

  redirectPage(movieId: any) {
    this.router.navigate(['movie/' + movieId])
  }

  redirectToEditPage(movieId: any) {
    this.router.navigate(['edit-movie/' + movieId])
  }
}
