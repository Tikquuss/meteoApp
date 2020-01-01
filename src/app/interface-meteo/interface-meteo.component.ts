import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-interface-meteo',
  templateUrl: './interface-meteo.component.html',
  styleUrls: ['./interface-meteo.component.css']
})

export class InterfaceMeteoComponent implements OnInit {

  public times = ['cloudy', 'rainy', 'sunny', 'stormy'];
  public time: string;
  public temperature: number = 20;
  public pluviometry: string = 'ESE 0 m/s';
  public humidity: number = 92;
  public ind: number;
  public hourly: boolean = true;
  public weekly: boolean = false;
  public city: string = 'Yaoundé';

  constructor(private userStore: UserStoreService,
              private router: Router) {
    this.ind = Math.floor(Math.random() * 4);
    switch (this.ind) {
      case 0: {
        this.time = 'Nuageux';
        break;
      }
      case 1: {
        this.time = 'Pluvieux';
        break;
      }
      case 2: {
        this.time = 'Ensoleillé';
        break;
      }
      case 3: {
        this.time = 'Orageux';
        break;
      }
    }
  }

  logOut() {
    this.userStore.isLoggedIn = false;
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
