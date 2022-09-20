import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  alarmOnOff:boolean = false;
  constructor(public ruteo: Router, public authService: AuthService) {}
  cambiarAlarma(){
    if(this.alarmOnOff == false){
      this.alarmOnOff = true;
    }else
    {
      this.alarmOnOff = false;
    }
  }

  logout(){
    this.authService.logout();
    this.ruteo.navigateByUrl('login');
  }
}
