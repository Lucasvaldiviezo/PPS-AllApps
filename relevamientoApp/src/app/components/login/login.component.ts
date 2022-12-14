import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ToastController } from '@ionic/angular';
import { SpeechRecognition } from '@awesome-cordova-plugins/speech-recognition/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  errorMessage: string = "";
  mostrarError = false;
  matches: string[];
  user = {
    email: '',
    password: ''
  }

  constructor(public fb: FormBuilder, public ruteo: Router, public authService: AuthService, private toastController: ToastController, private speechRecognition: SpeechRecognition) {
    this.formLogin = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  loguearse() {
    try {
      const email = this.formLogin.getRawValue().email;
      const password = this.formLogin.getRawValue().password;
      this.authService.login(email, password)
        .then(
          res => {
            if (res == null) {
              console.log("error al logearse", res);
            } else {
              this.mostrarError = false;
              this.ruteo.navigateByUrl('home');
              this.formLogin.reset();
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
              this.errorMessage = 'Contrase??a incorrecta.';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario no encontrado.';
              break;
            default:
              this.errorMessage = 'Error';
              break;
          }
          this.presentToast('bottom', 'danger');
        });
    } catch (error) {
      console.log("Error al ingresar", error);
    }
  }

  logeoAutomatico(email: string, password: string) {
    this.formLogin.controls['email'].setValue(email);
    this.formLogin.controls['password'].setValue(password);
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

  ingresoPorVoz() {
    let options = {
      language: 'es-ES',
    }
    this.getPermission();
    this.speechRecognition.startListening(options).subscribe(matches => {
      this.matches = matches;
      for (let i = 0; i < this.matches.length; i++) {
        switch (this.matches[i]) {
          case 'admin':
            this.logeoAutomatico('admin@admin.com', '111111');
            break;
          case 'invitado':
            this.logeoAutomatico('invitado@invitado.com', '222222');
            break;
          case 'usuario':
            this.logeoAutomatico('usuario@usuario.com', '333333');
            break;
          case 'anonimo':
            this.logeoAutomatico('anonimo@anonimo.com', '444444');
            break;
          case 'tester':
            this.logeoAutomatico('tester@tester.com', '555555');
            break;
        }
      }
    });
  }

  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
}
