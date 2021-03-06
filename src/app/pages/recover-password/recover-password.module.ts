import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecoverPasswordPageRoutingModule } from './recover-password-routing.module';
import { RecoverPasswordPage } from './recover-password.page';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoverPasswordPageRoutingModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [RecoverPasswordPage]
})
export class RecoverPasswordPageModule {}
