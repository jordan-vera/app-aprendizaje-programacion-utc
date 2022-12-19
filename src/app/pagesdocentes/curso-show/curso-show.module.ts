import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CursoShowPageRoutingModule } from './curso-show-routing.module';

import { CursoShowPage } from './curso-show.page';
import { ModalEstudiantesListPageModule } from './modal-estudiantes-list/modal-estudiantes-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursoShowPageRoutingModule,
    ModalEstudiantesListPageModule
  ],
  declarations: [CursoShowPage]
})
export class CursoShowPageModule { }
