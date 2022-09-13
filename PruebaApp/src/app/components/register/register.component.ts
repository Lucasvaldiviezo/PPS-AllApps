import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user = {
    email: '',
    password: ''
  }
  errorMessage: string = "";
  public formRegistro: FormGroup;
  constructor(public fb: FormBuilder, public authService: AuthServiceService, private alertController: AlertController, public ruteo: Router,private toastController: ToastController) {
    this.formRegistro = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
    });
  }

  ngOnInit() { }


  registrarse() {
    try {
      const email = this.formRegistro.getRawValue().email;
      const password = this.formRegistro.getRawValue().password;
      this.authService.register(email, password)
        .then((res:any) => {
          this.ruteo.navigateByUrl('home');
        })
        .catch((error: any) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'Email invalido.';
              break;
            case 'auth/email-already-in-use':
              this.errorMessage = 'Ese email ya esta en uso.';
              break;
            case 'auth/invalid-password':
              this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
              break;
            default:
              this.errorMessage = 'Error';
              break;
          }
          this.presentToast('bottom','danger');
        });
    } catch (error) {
      console.log("Error al registrarse", error);
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', color: 'primary' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      duration: 1500,
      position: position,
      color: color,
    });
    await toast.present();
  }

}
