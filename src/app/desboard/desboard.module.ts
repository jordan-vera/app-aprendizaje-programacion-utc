import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesboardPageRoutingModule } from './desboard-routing.module';

import { DesboardPage } from './desboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesboardPageRoutingModule
  ],
  declarations: [DesboardPage]
})
export class DesboardPageModule {}
