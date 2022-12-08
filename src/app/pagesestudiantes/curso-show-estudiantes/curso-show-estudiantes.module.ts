import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoShowEstudiantesPageRoutingModule } from './curso-show-estudiantes-routing.module';

import { CursoShowEstudiantesPage } from './curso-show-estudiantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoShowEstudiantesPageRoutingModule
  ],
  declarations: [CursoShowEstudiantesPage]
})
export class CursoShowEstudiantesPageModule {}
