import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { AnaliseComponent } from './analise.component';
import { AnaliseRoutingModule } from './analise-routing.module';

@NgModule({
  declarations: [AnaliseComponent],
  imports: [
    CommonModule,
    AnaliseRoutingModule,
    SharedModule
  ]
})
export class AnaliseModule {}
