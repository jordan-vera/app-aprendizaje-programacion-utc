import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoShowEstudiantesPageRoutingModule } from './curso-show-estudiantes-routing.module';

import { CursoShowEstudiantesPage } from './curso-show-estudiantes.page';
import { SpinnerPageModule } from 'src/app/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoShowEstudiantesPageRoutingModule,
    SpinnerPageModule
  ],
  declarations: [CursoShowEstudiantesPage]
})
export class CursoShowEstudiantesPageModule {}
