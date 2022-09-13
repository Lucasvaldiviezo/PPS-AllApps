import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginRegisterPageRoutingModule } from './login-register-routing.module';

import { LoginRegisterPage } from './login-register.page';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRegisterPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginRegisterPage,LoginComponent,RegisterComponent]
})
export class LoginRegisterPageModule {}
