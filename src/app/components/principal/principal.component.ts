import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DBTaskService } from 'src/app/services/dbtask.service';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private animationCtrl: AnimationController,
    public authenticationSerive: AuthenticationService,
    public dbtaskService: DBTaskService
  ) {
  }

  usuario: any;

  ngOnInit() {
    const card = this.animationCtrl.create()
      .addElement(document.querySelector('.card'))
      .addElement(document.querySelector('.bienvenido'))
      .duration(600)
      .fromTo('opacity', '0.1', '1')
      .play();

    this.obtenerUser();
  }

  obtenerUser (){
    this.dbtaskService.getNombreUsuarioActivo().then((data) => {
      this.storage.set("USER_DATA", data);
      this.usuario = data.user_name;
    })
  }

  public scan(): void {
    const navigationExtras: NavigationExtras = {
    };
    this.router.navigate(['scan-qr'], navigationExtras);
  }

}
