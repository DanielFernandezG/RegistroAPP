// import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { $ } from 'protractor';
import { Usuario } from 'src/app/model/Usuario';
import { AnimationController } from '@ionic/angular';
import { DBTaskService } from 'src/app/services/dbtask.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  public usuario: Usuario;


  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private animationCtrl: AnimationController,
    public dbtaskService: DBTaskService,
    public authenticationSerive:AuthenticationService
    ) {

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
      } else {
        this.router.navigate(['/login']);
      }
    });

  }

  public ngOnInit() {

    this.router.navigate(['home/principal']);

    const navigationExtras: NavigationExtras = {
      state: {
        usuario: this.usuario
      }
    };
    this.router.navigate(['/home/principal'], navigationExtras);

    const footer = this.animationCtrl.create()
      .addElement(document.querySelector('.footer'))
      .duration(1000)
      .fromTo('transform', 'translateX(-300px)', 'translateX(0px)')
      .play();

  }

  segmentChanged($event) {
    let direccion = $event.detail.value;
    this.router.navigate(['home/' + direccion]);
  }

  ionViewWillEnter(){
    this.router.navigate(['home/perfil']);
  }
  
  logout(){
    this.authenticationSerive.logout();
  }

}