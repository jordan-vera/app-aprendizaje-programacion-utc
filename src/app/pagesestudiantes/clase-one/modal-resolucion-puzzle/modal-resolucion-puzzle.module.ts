import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalResolucionPuzzlePage } from './modal-resolucion-puzzle.page';
import { ContadorModule } from 'src/app/contador/contador.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContadorModule
  ],
  declarations: [ModalResolucionPuzzlePage],
  exports: [ModalResolucionPuzzlePage]
})
export class ModalResolucionPuzzlePageModule {}
