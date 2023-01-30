import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudiantesRespuestasShowPageRoutingModule } from './estudiantes-respuestas-show-routing.module';

import { EstudiantesRespuestasShowPage } from './estudiantes-respuestas-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstudiantesRespuestasShowPageRoutingModule
  ],
  declarations: [EstudiantesRespuestasShowPage]
})
export class EstudiantesRespuestasShowPageModule {}
