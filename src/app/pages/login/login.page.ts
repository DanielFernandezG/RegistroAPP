import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, AnimationController } from '@ionic/angular';
import { DBTaskService } from 'src/app/services/dbtask.service';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public usuario: Usuario;

  constructor(
    private router: Router,
    public dbtaskService: DBTaskService,
    private toastController: ToastController,
    private storage: Storage,
    private animationCtrl: AnimationController,
    public alertController: AlertController,
    public authenticationSerive: AuthenticationService
  ) {
    this.usuario = new Usuario();
    this.usuario.nombreUsuario = '';
    this.usuario.password = '';
  }

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
    if (this.validarUsuario(this.usuario)) {
      this.authenticationSerive.login(this.usuario);
    }
  }

  public restablecer(): void {
    const navigationExtras: NavigationExtras = {
    };
    this.router.navigate(['recuperar-contrasenna'], navigationExtras);
  }

  registrar() {
    this.createSesionData(this.usuario);
  }

  createSesionData(usuario: any) {
    if (this.validarUsuario(usuario)) {
      let copy = Object.assign({}, usuario);
      copy.Active = 1;
      this.dbtaskService.createSesionData(copy)
        .then((data) => {
          this.mostrarMensaje("Usuario creado exitosamente");
          this.storage.set("USER_DATA", data);
          this.router.navigate(['home']);
        })
        .catch((error) => {
          this.mostrarMensaje("El usuario ya existe");
        })
    }
  }

  public validarUsuario(usuario: Usuario): boolean {
    const mensajeError = usuario.validarUsuario();
    if (mensajeError) {
      this.mostrarAlerta(mensajeError);
      return false;
    }
    return true;
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
