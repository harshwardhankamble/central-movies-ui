import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/data/User';
import { AuthenticateService } from '../service/authenticate.service';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  message: string = ""

  constructor(private auhtenticateService: AuthenticateService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(userForm: any) {
    let user: User = {
      userId: "",
      emailId: userForm.form.value.email,
      mobileNumber: userForm.form.value.mobile,
      password: userForm.form.value.password,
      dob: userForm.form.value.dateOfBirth,
      userName: userForm.form.value.username
    };

    axios.post(Constant.registerUrl, user)
      .then((response) => {
        this.router.navigate(['login']);
      })
      .catch((error) => {
        this.message = error.response.data['message']
      });
  }
}
