import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router'; 

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public error(): void {
    const navigationExtras: NavigationExtras = {
    };
    this.router.navigate(['**'], navigationExtras);
  }

}
