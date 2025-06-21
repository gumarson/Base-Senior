import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstacionamentoListComponent } from './estacionamento-list/estacionamento-list.component';
import { EstacionamentoFormularioSolicitacaoComponent } from './estacionamento-formulario-solicitacao/estacionamento-formulario-solicitacao.component';
import { EstacionamentoRevisaoSolicitacaoComponent } from './estacionamento-revisao-solicitacao/estacionamento-revisao-solicitacao.component';
import { EstacionamentoChamadoAdminComponent } from './estacionamento-chamado-admin/estacionamento-chamado-admin.component';

const routes: Routes = [
  { path: '', component: EstacionamentoListComponent },
  { path: 'solicitacao', component: EstacionamentoFormularioSolicitacaoComponent },
  { path: 'revisao', component: EstacionamentoRevisaoSolicitacaoComponent },
  { path: 'chamado', component: EstacionamentoChamadoAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstacionamentoRoutingModule {}
