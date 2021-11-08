import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from 'src/app/components/perfil/perfil.component';
import { PrincipalComponent } from 'src/app/components/principal/principal.component';
import { ApiclientComponent } from 'src/app/components/apiclient/apiclient.component';

import { HomePage } from './home.page';

const routes: Routes = [ 
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'principal',
        component: PrincipalComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'apiclient',
        component: ApiclientComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
