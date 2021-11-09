import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/model/Persona';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  public persona: Persona;

  constructor(
    private alertController: AlertController,
    private router: Router,
  ) {

    this.persona = new Persona();
    this.persona.rut = '';
    this.persona.nombre = '';
    this.persona.numero = '';
    this.persona.email = '';
    this.persona.carrera = '';
    this.persona.sede = '';

  }

  ngOnInit() {
    // this.persona.rut = '22.222.222.-2';
    // this.persona.nombre = 'Juanito Mendoza';
    // this.persona.numero = '+569 12 34 06 66';
    // this.persona.email = 'jmendoza@doucuc.cl';
    // this.persona.carrera = 'Analista Programador Computacional';
    // this.persona.sede = 'Padre Alonso de Ovalle';
  }

  async editarPerfil() {

    const alertController = await this.alertController.create({
      header: 'Editar Perfil',
      inputs: [
        {
          name: 'rut',
          type: 'text',
          placeholder: 'Rut',
          value: this.persona.rut,
        },
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: this.persona.nombre,
        },
        {
          name: 'numero',
          type: 'text',
          placeholder: 'Numero',
          value: this.persona.numero,
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: this.persona.email,
        },
        {
          name: 'carrera',
          type: 'text',
          placeholder: 'Carrera',
          value: this.persona.carrera,
        },
        {
          name: 'sede',
          type: 'text',
          placeholder: 'Sede',
          value: this.persona.sede,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Editar',
          handler: data => {
            const ok = this.validarDatosPerfil(data.rut, data.nombre
              , data.numero, data.email, data.carrera, data.sede);
            return ok;
          }
        }
      ]
    });

    await alertController.present();
  }

  public validarDatosPerfil(rut: string, nombre: string, numero: string
    , email: string, carrera: string, sede: string): boolean {

    this.persona.rut = rut;
    this.persona.nombre = nombre;
    this.persona.numero = numero;
    this.persona.email = email;
    this.persona.carrera = carrera;
    this.persona.sede = sede;

    return true;

  }

  restablecerPassword() {
    this.router.navigate(['recover-password']);
  }

}