import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, Animation, AnimationController } from '@ionic/angular';
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

  login: any = {
    Usuario: "",
    Password: ""
  }

  field: string = "";

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

  public inicio(): void {

    if (this.validateModel(this.login)) {
      // Se obtiene si existe alguna data de sesión
      this.authenticationSerive.recuperarContrasenna(this.login);
    }
    else {
      this.presentToast("Falta: " + this.field);
    }


  }

  async mostrarMensaje(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: duracion ? duracion : 2000,
      position: "top"
    });
    toast.present();
  }

  public validarNombreUsuario(usuario: Usuario): boolean {

    const mensajeError = usuario.validarNombreUsuario();

    if (mensajeError) {
      this.mostrarAlerta(mensajeError);
      return false;
    }

    return true;
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

  validateModel(model: any) {
    // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
    for (var [key, value] of Object.entries(model)) {
      // Si un valor es "" se retornara false y se avisara de lo faltante
      if (value == "") {
        // Se asigna el campo faltante
        this.field = key;
        // Se retorna false
        return false;
      }
    }
    return true;
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

  ingresar() {
    // Se valida que el usuario ingreso todos los datos
    if (this.validateModel(this.login)) {
      // Se obtiene si existe alguna data de sesión
      this.authenticationSerive.login(this.login);
    }
    else {
      this.presentToast("Falta: " + this.field);
    }
  }

  obtenerUser() {
    this.dbtaskService.getNombreUsuarioActivo().then((data) => {
      this.storage.set("USER_DATA", data);
      this.login.Usuario = data.user_name;
    })
  }

}