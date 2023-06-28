import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { AccessToken } from 'src/assets/data/AccessToken';
import { Credential } from 'src/assets/data/Credential';
import { User } from 'src/assets/data/User';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  accessToken: AccessToken = {
    userId: '',
    userSessionToken: '',
    accessDeniedReason: ''
  };

  constructor(private router: Router, private cookieService: CookieService) { }

  loginUserAndGenerateToken(loginForm: any) {

    var userCredential: User = {
      userId: '',
      userName: loginForm.form.value.username,
      password: loginForm.form.value.password,
      emailId: '',
      mobileNumber: '',
      dob: new Date()
    }

    axios.post(Constant.loginUrl, userCredential)
      .then((response) => {
        userCredential.emailId = response.data['emailId']
        userCredential.mobileNumber = response.data['mobileNumber']
        userCredential.userId = String(response.data['userId'])

        userCredential.userName = response.data['userName']

        axios.get(Constant.authToken, { params: { userId: userCredential.userId, username: userCredential.userName } })
          .then((response) => {
            this.accessToken.userSessionToken = response.data['userSessionToken']
            this.accessToken.userId = userCredential.userId

            this.cookieService.set('token', response.data['userSessionToken']);
            localStorage.setItem('access_token', response.data['userSessionToken']);
            
            this.router.navigate(['home'])
          }).catch((error) => {
            this.accessToken.accessDeniedReason = error.response.data['accessDeniedReason']
            this.router.navigate(['login'])
          })

      }).catch((error) => {
        this.accessToken.accessDeniedReason = error.response.data['message']
        this.router.navigate(['login'])
      })

  }
}
