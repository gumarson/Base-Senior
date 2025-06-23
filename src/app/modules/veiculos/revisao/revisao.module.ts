import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevisaoRoutingModule } from './revisao-routing.module';
import { RevisaoComponent } from './revisao.component';


@NgModule({
  declarations: [
    RevisaoComponent
  ],
  imports: [
    CommonModule,
    RevisaoRoutingModule
  ]
})
export class RevisaoModule { }
