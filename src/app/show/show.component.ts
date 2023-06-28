import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import axios from 'axios';
import { Constant } from 'src/assets/data/constant/Constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  userId: string = ''

  shows = []

  constructor(private authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()
    this.loadShows()
  }

  loadShows() {
    axios.get(Constant.getShowUrl, { params: { userId: this.userId } })
      .then(response => {
        this.shows = response.data
      })
      .catch(error => {
        this.router.navigate(['error'], { state: { error: error.response.data } })
      })
  }

  getShowDetails(showId: number) {
    this.router.navigate(['show/' + showId])
  }
}
