import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  timeLeft: number = 3;
  interval: any;
  cargarTerminada: boolean = false;
  constructor(private platform: Platform) { }

  ngOnInit(): void {
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else if (this.timeLeft == 0) {
        this.cargarTerminada = true;
      }
    }, 1000);

  }

  
}
