import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import axios from "axios";
import { Observable } from "rxjs";
import { User } from "src/assets/data/User";
import { Constant } from "src/assets/data/constant/Constant";

@Injectable({
    providedIn: 'root'
})

export class AuthenticateService {

    token: any;

    constructor(private jwtHelperService: JwtHelperService, private router: Router) { }

    validateToken() {
        this.token = localStorage.getItem('access_token');
        return this.jwtHelperService.isTokenExpired(this.token)
    }

    getUserIdFromToken() {
        if (!this.validateToken()) {
            let data: any = this.jwtHelperService.decodeToken(this.token);
            return data.userId
        } else {
            this.router.navigate(['login'])
        }
        return '';
    }
}