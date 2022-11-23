import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaseShowPageRoutingModule } from './clase-show-routing.module';

import { ClaseShowPage } from './clase-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaseShowPageRoutingModule
  ],
  declarations: [ClaseShowPage]
})
export class ClaseShowPageModule {}
