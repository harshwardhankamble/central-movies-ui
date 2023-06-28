import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authenticate.service';
import axios from 'axios';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  userId = ''

  wallet: any

  constructor(private router: Router, private authenticateService: AuthenticateService) { }

  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()
    this.loadWalletData()
  }

  loadWalletData() {
    axios.get(Constant.getPaymentUrl + '/wallet', { params: { userId: this.userId } })
      .then(response => {
        this.wallet = response.data
      })
      .catch(error => {
        this.router.navigate(['error'], { state: { error: error.response.data } })
      })
  }

}
