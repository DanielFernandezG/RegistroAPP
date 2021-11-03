import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, Animation, AnimationController } from '@ionic/angular';

import { DBTaskService } from 'src/app/services/dbtask.service';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { type } from 'os';
import { Usuario } from 'src/app/model/Usuario';
import { Persona } from 'src/app/model/Persona';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  login: any = {
    Usuario: "",
    Password: ""
  }

  field: string = "";



  public usuario: Usuario;

  constructor(private router: Router,
    public dbtaskService: DBTaskService,
    private toastController: ToastController,
    private storage: Storage,
    private animationCtrl: AnimationController,
    public alertController: AlertController,
    public authenticationSerive: AuthenticationService
  ) { }
  public ngOnInit(): void {



    const title = this.animationCtrl.create()
      .addElement(document.querySelector('.title'))
      .duration(500)
      .fromTo('transform', 'translateX(-100px)', 'translateX(0px)')
      .play();

    const loginCard = this.animationCtrl.create()
      .addElement(document.querySelector('.login-card'))
      .duration(1000)
      .fromTo('opacity', '0.1', '1')
      .play();
  }

  ingresar() {

    if (this.validateModel(this.login)) {

      this.authenticationSerive.login(this.login);
    }
    else {
      this.presentToast("Falta: " + this.field);
    }
  }


  public restablecer(): void {

    const navigationExtras: NavigationExtras = {

    };
    this.router.navigate(['recover-password'], navigationExtras);
  }

  registrar() {
    this.createSesionData(this.login);
  }
  /**
   * Función que genera (registra) una nueva sesión
   * @param login 
   */
  createSesionData(login: any) {
    if (this.validateModel(login)) {
      /**
       * Se hace una copia del login, se hace así ya que
       * el operador '=' no haceuna copia de los datos, si no
       * que crea una nueva referencia a los mismos datos.
       * Por eso se utiliza el Object.assign
       */
      let copy = Object.assign({}, login);
      copy.Active = 1;
      this.dbtaskService.createSesionData(copy)
        .then((data) => {
          this.presentToast("Usuario creado exitosamente");
          this.storage.set("USER_DATA", data);
          this.router.navigate(['home']);
          this.dbtaskService.createPerfil();
        })
        .catch((error) => {
          this.presentToast("El usuario ya existe");
        })
    }
    else {
      this.presentToast("Falta: " + this.field);
    }
  }
  /**
   * validateModel sirve para validar que se ingrese algo en los
   * campos del html mediante su modelo
   */
  validateModel(model: any) {

    for (var [key, value] of Object.entries(model)) {

      if (value == "") {

        this.field = key;

        return false;
      }
    }
    return true;
  }
  /**
   * Muestra un toast al usuario
   * @param message Mensaje a presentar al usuario
   * @param duration Duración el toast, este es opcional
   */
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration ? duration : 2000
      }
    );
    toast.present();
  }

  ionViewWillEnter() {
    console.log('ionViewDidEnter');

    this.dbtaskService.sesionActive()
      .then((data) => {
        if (data != undefined) {
          this.storage.set("USER_DATA", data);
          this.router.navigate(['home']);
        }
      })
      .catch((error) => {
        console.error(error);
        this.router.navigate(['login']);
      })
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Creación de Usuario',
      message: 'Mensaje <strong>El usuario no existe, desea registrarse?</strong>',
      buttons: [
        {
          text: 'NO',
          role: 'cancel'
        }, {
          text: 'SI',
          handler: () => {
            this.createSesionData(this.login)
          }
        }
      ]
    });

    await alert.present();
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
