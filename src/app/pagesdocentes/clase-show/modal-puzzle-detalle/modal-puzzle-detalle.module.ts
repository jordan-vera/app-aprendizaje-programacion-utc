import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ModalPuzzleDetallePage } from './modal-puzzle-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [ModalPuzzleDetallePage],
  exports: [ModalPuzzleDetallePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalPuzzleDetallePageModule { }
