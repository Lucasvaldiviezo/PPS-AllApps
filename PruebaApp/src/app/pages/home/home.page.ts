import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userState = this.authService.getUserLogged();
  constructor(public authService: AuthServiceService) {}

  desloguearse(){
    this.authService.logout();
  }
}
