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

  public usuario: Usuario;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private animationCtrl: AnimationController,
    public authenticationSerive: AuthenticationService,
    public dbtaskService: DBTaskService
  ) {


  }

  ngOnInit() {
    const card = this.animationCtrl.create()
      .addElement(document.querySelector('.card'))
      .addElement(document.querySelector('.bienvenido'))
      .duration(600)
      .fromTo('opacity', '0.1', '1')
      .play();

    this.dbtaskService.getNombreUsuario
  }

  public scan(): void {

    const navigationExtras: NavigationExtras = {

    };
    this.router.navigate(['scan-qr'], navigationExtras);
  }

}
