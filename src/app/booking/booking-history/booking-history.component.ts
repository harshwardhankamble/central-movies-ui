import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { Payment } from 'src/assets/data/Payment';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  userId = ''

  bookingAudit = []

  constructor(private authenticateService: AuthenticateService, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()
    this.loadBookingHistory()
  }

  loadBookingHistory() {
    axios.get(Constant.getBookingUrl + '/history', {params: {userId: this.userId}})
    .then(response => {
      this.bookingAudit = response.data
    })
    .catch(error => {
      this.router.navigate(['error'], {state: {error: error.response.data}})
    })
  }

  doPaymentForBooking(bookingId: number, totalCost: number) {
    let payment: Payment = {
      bookingId: bookingId,
      userId: this.userId,
      totalCost: totalCost,
      paymentType: 'UPI'
    }

    axios.post(Constant.getPaymentUrl, payment, {params: {userId: this.userId}})
    .then(response => {
      this.router.navigate(['home'])
    })
    .catch(error => {
      this.router.navigate(['error'], { state: { error: error.response.data } })
    })
  }
}
