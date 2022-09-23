import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';


@NgModule({
  providers: [
    DeviceMotion,
    Vibration,
    Flashlight,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
