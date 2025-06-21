// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { EstacionamentoRoutingModule } from './estacionamento-routing.module';
// import { EstacionamentoListComponent } from './estacionamento-list/estacionamento-list.component';
// import { EstacionamentoFormularioSolicitacaoComponent } from './estacionamento-formulario-solicitacao/estacionamento-formulario-solicitacao.component';
// import { EstacionamentoRevisaoSolicitacaoComponent } from './estacionamento-revisao-solicitacao/estacionamento-revisao-solicitacao.component';
// import { EstacionamentoChamadoAdminComponent } from './estacionamento-chamado-admin/estacionamento-chamado-admin.component';

// @NgModule({
//   declarations: [
//     EstacionamentoListComponent,
//     EstacionamentoFormularioSolicitacaoComponent,
//     EstacionamentoRevisaoSolicitacaoComponent,
//     EstacionamentoChamadoAdminComponent,
//   ],
//   imports: [
//     CommonModule,
//     EstacionamentoRoutingModule
//   ]
// })
// export class EstacionamentoModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ necessário para ngModel
import { EstacionamentoRoutingModule } from './estacionamento-routing.module';
import { EstacionamentoListComponent } from './estacionamento-list/estacionamento-list.component';
import { EstacionamentoRevisaoSolicitacaoComponent } from './estacionamento-revisao-solicitacao/estacionamento-revisao-solicitacao.component';
import { EstacionamentoChamadoAdminComponent } from './estacionamento-chamado-admin/estacionamento-chamado-admin.component';

// ✅ Módulos PrimeNG usados
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown'; // se estiver usando dropdown
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    EstacionamentoListComponent,
    EstacionamentoRevisaoSolicitacaoComponent,
    EstacionamentoRevisaoSolicitacaoComponent,
    EstacionamentoChamadoAdminComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,       // ✅ necessário para ngModel
    EstacionamentoRoutingModule,
    CardModule,        // ✅ necessário para <p-card>
    ButtonModule,      // ✅ necessário para <p-button>
    DropdownModule     // ✅ necessário para <p-dropdown> (caso esteja usando)
  ]
})
export class EstacionamentoModule {}
