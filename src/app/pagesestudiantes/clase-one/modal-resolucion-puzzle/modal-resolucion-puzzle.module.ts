import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalResolucionPuzzlePage } from './modal-resolucion-puzzle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ModalResolucionPuzzlePage],
  exports: [ModalResolucionPuzzlePage]
})
export class ModalResolucionPuzzlePageModule {}
