import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PrincipalComponent } from "./principal/principal.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { MapaComponent } from './mapa/mapa.component';

// imports de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        IonicModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
    ],
    declarations: [
        PrincipalComponent,
        PerfilComponent,
        MapaComponent,
        
    ],
    exports: [
        PrincipalComponent,
        PerfilComponent,
        MapaComponent,
        FormsModule,
        
        
    ],
})
export class ComponentsModule {}