import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css']
})
export class MovieinfoComponent implements OnInit {

  movie: any = {
    posterImage: ''
  }

  shows = []

  userId: any = ''

  releasedDate: Date = new Date()

  constructor(private route: ActivatedRoute, private authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()

    this.route.params.subscribe((param) => {
      axios.get(Constant.getMoviesUrl + '/' + param['id'], { params: { userId: this.userId } })
        .then((response) => {
          this.movie = response.data;

          if (this.movie['releasedDate'] != null && this.movie['releasedDate'] !== '') {
            this.releasedDate = new Date(Number(this.movie['releasedDate']))
          }
        })
        .catch((error) => {
          this.router.navigate(['error'], { state: { error: error.response.data } })
        })

      axios.get(Constant.getShowUrl + '/movie/' + param['id'], { params: { userId: this.userId } })
        .then(response => {
          this.shows = response.data
        })
        .catch((error) => {
          this.router.navigate(['error'], { state: { error: error.response.data } })
        })
    })
  }
}
