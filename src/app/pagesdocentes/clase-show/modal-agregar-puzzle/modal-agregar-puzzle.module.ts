import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAgregarPuzzlePage } from './modal-agregar-puzzle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ModalAgregarPuzzlePage],
  exports:[ModalAgregarPuzzlePage]
})
export class ModalAgregarPuzzlePageModule {}
