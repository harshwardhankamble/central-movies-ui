import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId = ''

  users = []

  constructor(private authenticateService: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()
    this.loadAllUsers()
  }

  loadAllUsers() {    
    axios.get(Constant.registerUrl + '/customers', {params: {userId: this.userId}})
    .then(response => {
      this.users = response.data
    })
    .catch(error => {
      this.router.navigate(['error'], {state: {error: error.response.data}})
    })
  }

  changeRole(userId: number, roleId: number) {
    axios.put(Constant.registerUrl + '/' + userId + '/role/' + roleId, null, { params: { userId: this.userId } })
    .then(response => {
      window.location.reload();
    })
    .catch(error => {
      this.router.navigate(['error'], { state: { error: error.response.data } })
    })
  }

}
