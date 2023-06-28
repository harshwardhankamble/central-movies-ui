import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { Constant } from 'src/assets/data/constant/Constant';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  userId: any

  show: any

  constructor(private route: ActivatedRoute, private authenticateService: AuthenticateService) {}
  
  ngOnInit(): void {
    this.userId = this.authenticateService.getUserIdFromToken()
    this.loadShow()
  }

  loadShow() {
    this.route.params.subscribe(param => {
      axios.get(Constant.getShowUrl + '/' + param['id'], {params: {userId: this.userId}})
      .then(response => {
        this.show = response.data
      })
    })
  }
}
