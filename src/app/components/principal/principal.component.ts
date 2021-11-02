import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AnimationController } from '@ionic/angular';

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
  ) {

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      }
    });

  }

  ngOnInit() {
    const card = this.animationCtrl.create()
      .addElement(document.querySelector('.card'))
      .addElement(document.querySelector('.bienvenido'))
      .duration(600)
      .fromTo('opacity', '0.1', '1')
      .play();
  }

  public scan(): void {

    const navigationExtras: NavigationExtras = {

    };
    this.router.navigate(['scan-qr'], navigationExtras);
  }

}
