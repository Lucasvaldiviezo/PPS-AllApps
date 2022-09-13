import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { MenuBarComponent } from 'src/app/components/menu-bar/menu-bar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
  ]
})
export class HomePageModule {}
