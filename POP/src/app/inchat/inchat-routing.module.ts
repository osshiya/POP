import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InchatPage } from './inchat.page';

import {AutosizeModule} from 'ngx-autosize';
 

const routes: Routes = [
  {
    path: '',
    component: InchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), AutosizeModule],
  exports: [RouterModule],
})
export class InchatPageRoutingModule {}
