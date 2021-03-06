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

  public valueSelected: string;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private animationCtrl: AnimationController,
    public dbtaskService: DBTaskService,
    public authenticationSerive:AuthenticationService
    ) {

  }

  public ngOnInit() {
    const footer = this.animationCtrl.create()
      .addElement(document.querySelector('.footer'))
      .duration(1000)
      .fromTo('transform', 'translateX(-300px)', 'translateX(0px)')
      .play();
    this.valueSelected = "principal";
  }

  segmentChanged($event) {
    let direccion = $event.detail.value;
    this.router.navigate(['home/' + direccion]);
  }

  ionViewWillEnter(){
    this.router.navigate(['home/principal']);
    this.valueSelected = "principal";
  }
  
  logout(){
    this.authenticationSerive.logout();
  }

}