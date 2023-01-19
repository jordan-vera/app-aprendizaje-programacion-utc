import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaseOnePageRoutingModule } from './clase-one-routing.module';

import { ClaseOnePage } from './clase-one.page';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ModalResolucionQuizzPageModule } from './modal-resolucion-quizz/modal-resolucion-quizz.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaseOnePageRoutingModule,
    MonacoEditorModule,
    ModalResolucionQuizzPageModule
  ],
  declarations: [ClaseOnePage]
})
export class ClaseOnePageModule {}
