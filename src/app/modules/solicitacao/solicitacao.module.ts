import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitacaoRoutingModule } from './solicitacao-routing.module';
import { SolicitacaoComponent } from './solicitacao.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RevisaoComponent } from '../revisao/revisao.component';

@NgModule({
  declarations: [SolicitacaoComponent],
  imports: [CommonModule, SolicitacaoRoutingModule, SharedModule]
})
export class SolicitacaoModule {}
