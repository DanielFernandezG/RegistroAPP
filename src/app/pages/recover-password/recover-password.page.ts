import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController, AnimationController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from '../../services/authentication.service';
import { DBTaskService } from '../../services/dbtask.service';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage implements OnInit {

  rePassword: String = "";

  public usuario: Usuario;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private animationCtrl: AnimationController,
    private alertController: AlertController,
    public authenticationSerive: AuthenticationService,
    public dbtaskService: DBTaskService,
    private storage: Storage) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }

  ngOnInit() {
    const recover = this.animationCtrl.create()
      .addElement(document.querySelector('.recover'))
      .addElement(document.querySelector('.recover1'))
      .addElement(document.querySelector('.recover2'))
      .addElement(document.querySelector('#boton'))
      .duration(500)
      .fromTo('transform', 'translatey(200px)', 'translateX(0px)')
      .play();

    const title = this.animationCtrl.create()
      .addElement(document.querySelector('.title'))
      .duration(1000)
      .fromTo('opacity', '0.1', '1')
      .play();
    this.obtenerUser();
  }

  public recuperar(): void {
    if (this.rePassword === this.usuario.password) {
      if (this.validarPassword(this.usuario)) {
        this.authenticationSerive.recuperarContrasenna(this.usuario);
      }
    }
    else {
      this.mostrarAlerta('Las contraseñas no coinciden');
    } 
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  public validarPassword(usuario: Usuario): boolean {
    const mensajeError = usuario.validarPassword();
    if (mensajeError) {
      this.mostrarAlerta(mensajeError);
      return false;
    }
    return true;
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
      position: "top"
    });
    toast.present();
  }

  obtenerUser() {
    this.dbtaskService.getNombreUsuarioActivo().then((data) => {
      this.storage.set("USER_DATA", data);
      this.usuario.nombreUsuario = data.user_name;
    })
  }

}