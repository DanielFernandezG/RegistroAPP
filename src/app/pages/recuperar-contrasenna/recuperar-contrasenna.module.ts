import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecuperarContrasennaPageRoutingModule } from './recuperar-contrasenna-routing.module';
import { RecuperarContrasennaPage } from './recuperar-contrasenna.page';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContrasennaPageRoutingModule,
    MatButtonModule,
  ],
  declarations: [RecuperarContrasennaPage]
})
export class RecuperarContrasennaPageModule {}
