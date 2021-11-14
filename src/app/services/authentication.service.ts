import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { DBTaskService } from './dbtask.service';
import { Usuario } from '../model/Usuario';

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

  login(usuario: Usuario) {
    this.dbtaskService.getSesionData(usuario)
      .then((data) => {
        if (data === undefined) {
          this.mostrarMensaje("Credenciales Incorrectas");
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

  recuperarContrasenna(usuario: Usuario) {
    this.dbtaskService.getNombreUsuario(usuario)
      .then((data) => {
        if (data === undefined) {
          this.mostrarMensaje("Credenciales Incorrectas");
        } else {
          data.password = usuario.password;
          this.dbtaskService.updateContrasenna(data)
            .then((response) => {
              this.storage.set("USER_DATA", data);
              console.log(data);
              this.mostrarMensaje("Contraseña Restablecida");
              this.router.navigate(['home']);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
      position: "top"
    });
    toast.present();
  }

  isAuthenticated() {
    return this.authState.value;
  }

}