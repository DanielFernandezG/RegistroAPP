import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarContrasennaPage } from './recuperar-contrasenna.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarContrasennaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarContrasennaPageRoutingModule {}
