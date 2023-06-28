import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId = ''
  role = ''

  constructor(private authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()

    if (this.userId !== '') {
      axios.get(Constant.registerUrl + '/' + this.userId + '/role')
        .then(response => {
          this.role = response.data
          console.log(this.role);

        })
        .catch(error => {
          this.router.navigate(['error'], { state: { error: error.response.data } })
        })
    }
  }

  logOut() {
    localStorage.removeItem('access_token')
    this.router.navigate(['login'])
    window.location.reload();
  }
}
