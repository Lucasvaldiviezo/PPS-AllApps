import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { NavController } from '@ionic/angular';
import {Howl, Howler} from 'howler';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  alarmOnOff:boolean = false;
  guardador:string;
  variable:boolean = true;
  contra:string;
  x:number;
  y:number;
  z:number;
  revisar:boolean = false;
  timeStamp:number;
  id:any;
  rata:boolean = true;
  constructor(public ruteo: Router, public authService: AuthService, public navCtrl: NavController,public deviceMotion:DeviceMotion,private vibration: Vibration,private flashlight: Flashlight) {}
  setear(datos:string)
  {
    this.guardador = datos;
  }

  funn()
  {
    this.variable = (!this.variable);
    try {
      var option:DeviceMotionAccelerometerOptions = 
      {
        frequency: 200
      };
      this.id = this.deviceMotion.watchAcceleration(option).subscribe((acc:DeviceMotionAccelerationData)=>
      {
        this.x = acc.x;
        this.y = acc.y;
        this.z = acc.z;
        this.timeStamp = this.timeStamp;
        console.log("lala",this.x,this.y,this.z,this.timeStamp);
        if(this.x > 9)
        {
          this.revisar = true;
           const sound = new Howl({
           src: ['../../assets/audios/colores/azul.mp3']
    
         });
        
         sound.play();
        
         Howler.volume(1.5);
        }
        if(this.x < -9)
        {
          const sound = new Howl({
            src: ['../../assets/audios/colores/rojo.mp3']
     
          });
         
          sound.play();
         
          Howler.volume(1.5);
         }
         if(this.y > 9)
         {
           this.revisar = true;
           if(this.rata)
           {
            this.flashlight.switchOn();
            const sound = new Howl({
              src: ['../../assets/audios/colores/gris.mp3']
            });
            sound.play();
            Howler.volume(1.5);
            setTimeout(() => {
              this.flashlight.switchOff();
              this.rata = false;
              setTimeout(() => {
                this.rata = true;
              }, 5000);
            }, 5000);
           }
         }
         if(this.x >0 && this.x < 1 && this.y >0 && this.y < 1)
         {
           if(this.revisar)
           {
            const sound = new Howl({
              src: ['../../assets/audios/colores/verde.mp3']
       
            });
           
            sound.play();
           
            Howler.volume(1.5);
            this.vibration.vibrate(5000);
            this.revisar = false;
            setTimeout(() => {
              this.vibration.vibrate(0);
            }, 5000);
            setTimeout(() => {
              this.revisar = true;
            }, 10000);
            
           }
         }

        }
      );
      
    } catch (error) {
      
    }
    
  }

 
  
  cambiarAlarma(){
    if(this.alarmOnOff == false){
      this.alarmOnOff = true;
      this.funn();
    }else
    {
      this.alarmOnOff = false;
      this.id.unsubscribe();
      this.variable = (!this.variable);
    }
  }

  logout(){
    this.authService.logout();
    this.ruteo.navigateByUrl('login');
  }
}
