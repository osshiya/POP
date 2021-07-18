import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InchatPageRoutingModule } from './inchat-routing.module';

import { InchatPage } from './inchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InchatPageRoutingModule
  ],
  declarations: [InchatPage]
})
export class InchatPageModule {}
