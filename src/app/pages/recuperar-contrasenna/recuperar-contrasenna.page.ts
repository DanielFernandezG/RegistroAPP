import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, Animation, AnimationController, AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-recuperar-contrasenna',
  templateUrl: './recuperar-contrasenna.page.html',
  styleUrls: ['./recuperar-contrasenna.page.scss'],
})
export class RecuperarContrasennaPage implements OnInit {

  public usuario: Usuario;

  constructor(private router: Router,
    private toastController: ToastController,
    private animationCtrl: AnimationController,
    public alertController: AlertController,) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }

  ngOnInit() {
    const recover = this.animationCtrl.create()
      .addElement(document.querySelector('.recover'))
      .addElement(document.querySelector('#boton'))
      .duration(500)
      .fromTo('transform', 'translatey(200px)', 'translateX(0px)')
      .play();

    const title = this.animationCtrl.create()
    .addElement(document.querySelector('.title'))
    .duration(1000)
    .fromTo('opacity', '0.1', '1')
    .play();
  }

  public inicio(): void {
    if (!this.validarUsuario(this.usuario)) {
      return;
    }
    this.mostrarMensaje('¡Se ha enviado un correo para restablecer su contraseña!');
    const navigationExtras: NavigationExtras = {
    };
    this.router.navigate(['login'], navigationExtras);
  }

  public validarUsuario(usuario: Usuario): boolean {
    const mensajeError = usuario.validarNombreUsuario();
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

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
}
