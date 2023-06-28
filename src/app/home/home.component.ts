import { Component, Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticateService } from '../service/authenticate.service';
import { Movie } from 'src/assets/data/Movie';
import axios from 'axios';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  isTokenExpired: any

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit(): void {
    this.isTokenExpired = this.authenticateService.validateToken();
  }

}
