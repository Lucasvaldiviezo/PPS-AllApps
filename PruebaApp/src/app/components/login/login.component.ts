import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { ToastController } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }
  public formRegistro: FormGroup;
  errorMessage: string = "";
  mostrarError = false;
  constructor(public fb: FormBuilder, public ruteo: Router, public authService: AuthServiceService, private toastController: ToastController) {
    this.formRegistro = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
    });
  }

  ngOnInit() { }



  loguearse() {
    try {
      const email = this.formRegistro.getRawValue().email;
      const password = this.formRegistro.getRawValue().password;
      this.authService.login(email, password)
        .then(
          res => {
            if (res == null) {
              console.log("error al logearse", res);
            } else {
              console.log("ingreso!: ", res);
              this.mostrarError = false;
              this.ruteo.navigateByUrl('home');
              this.formRegistro.reset();
            }
          })
        .catch((error: any) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'Email invalido.';
              break;
            case 'auth/user-disabled':
              this.errorMessage = 'Usuario deshabilitado.';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario no encontrado.';
              break;
            case 'auth/wrong-password':
              this.errorMessage = 'Contraseña incorrecta.';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario no encontrado.';
              break;
            default:
              this.errorMessage = 'Error';
              break;
          }
          this.presentToast('bottom','danger');
        });
    } catch (error) {
      console.log("Error al ingresar", error);
    }
  }

  logeoAutomatico(email:string,password:string){
    this.formRegistro.controls['email'].setValue(email);
    this.formRegistro.controls['password'].setValue(password);
    this.loguearse();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', color: 'primary' | 'danger') {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      duration: 1500,
      position: position,
      color: color,
    });

    await toast.present();
  }
}
