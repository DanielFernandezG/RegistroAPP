import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DBTaskService } from './dbtask.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  constructor(
    private router: Router,
    private storage: Storage,
    public dbtaskService: DBTaskService,
    public toastController: ToastController
  ) {
    this.isLogged();
  }

  isLogged() {
    this.storage.get("USER_DATA").
      then((response) => {
        console.log(response)

        if (response != null) {
          console.log(response)
          this.authState.next(true);
        }
        else {
        }
      })
  }

  logout() {

    this.storage.get("USER_DATA").then((data) => {

      data.active = 0;

      this.dbtaskService.updateSesionData(data)

        .then((response) => {

          if (response.rowsAffected >= 1) {

            this.storage.remove("USER_DATA");

            this.router.navigate(['login']);
            this.authState.next(false);
          }
        })
        .catch((error) => console.error(error))
    });
  }
  login(login: any) {

    this.dbtaskService.getSesionData(login)
      .then((data) => {
        if (data === undefined) {
          this.presentToast("Credenciales Incorrectas");
        } else {
          data.active = 1;
          this.dbtaskService.updateSesionData(data)
            .then((response) => {
              this.storage.set("USER_DATA", data);
              this.authState.next(true);
              this.router.navigate(['home']);

            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  recuperarContrasenna(login: any) {
    this.dbtaskService.getNombreUsuario(login)
      .then((data) => {
        if (data === undefined) {
          this.presentToast("Credenciales Incorrectas");
        } else {
          data.password = login.Password;
          this.dbtaskService.updateContrasenna(data)
            .then((response) => {
              this.storage.set("USER_DATA", data);
              console.log(data);
              this.authState.next(true);
              this.presentToast("Contraseña Restablecida"); 
              this.router.navigate(['login']);

            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration ? duration : 2000
      }
    );
    toast.present();
  }
  isAuthenticated() {
    return this.authState.value;
  }
}