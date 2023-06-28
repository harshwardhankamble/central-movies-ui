import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { Booking } from 'src/assets/data/Booking';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {

  shows = []

  showTime = []

  userId = ''

  seats = []

  seatIds: any = []

  constructor(private router: Router, private authenticateService: AuthenticateService) {
  }

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

  getShowsForShowId(event: any) {
    let targetId: number = event.target.value

    this.shows.forEach((show: any) => {
      if (show['showId'] == targetId) {
        this.showTime = show['showTime']
      }
    });
  }

  getSeatsForShow(event: any) {
    axios.get(Constant.getSeatUrl, { params: { userId: this.userId, screenId: event.target.value.split('$')[0], showTime: event.target.value.split('$')[1] } })
      .then(response => {
        this.seats = response.data
      })
  }

  bookShow(bookingForm: any) {
    console.log(bookingForm.form.value.showTime.split('$')[0]);

    let splitData = bookingForm.form.value.showTime.split('$');

    let booking: Booking = {
      userId: this.userId,
      totalSeats: this.seatIds.length,
      screenId: splitData[0],
      showDateTimeString: splitData[1],
      seatIds: this.seatIds
    }

    axios.post(Constant.getBookingUrl, booking, {params: {userId: this.userId}})
    .then(response => {
      this.router.navigate(['home'])
    }).catch(error => {
      console.log(error.response.data);
      
    })
  }

  addSeatsToForm(seatId: any) {
    this.seatIds.push(seatId)
  }
}

