import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesboardPageRoutingModule } from './desboard-routing.module';

import { DesboardPage } from './desboard.page';
import { LoginAnimationComponent } from '../login-animation/login-animation.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesboardPageRoutingModule
  ],
  declarations: [DesboardPage, LoginAnimationComponent]
})
export class DesboardPageModule {}
