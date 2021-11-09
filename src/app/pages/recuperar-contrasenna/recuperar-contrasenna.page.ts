import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController, Animation, AnimationController } from '@ionic/angular';
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
    private animationCtrl: AnimationController) {
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
    this.mostrarMensaje('¡Se ha enviado un correo para restablecer su contraseña!');
    const navigationExtras: NavigationExtras = {
    };
    this.router.navigate(['login'], navigationExtras);
  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
      position: "top"
    });
    toast.present();
  }

}
