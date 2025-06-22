import { Component, OnInit } from '@angular/core';
import { EstacionamentoService } from '../services/estacionamento.service';
import { WorkflowService } from '@core/service/workflow/workflow.service';

@Component({
  selector: 'app-estacionamento-chamado-admin',
  templateUrl: './estacionamento-chamado-admin.component.html',
  styleUrls: ['./estacionamento-chamado-admin.component.scss']
})
export class EstacionamentoChamadoAdminComponent implements OnInit {
  vagas: any[] = [];
  codest!: string;

  constructor(
    private estacionamentoService: EstacionamentoService,
    private workflowService: WorkflowService
  ) {}

  async ngOnInit(): Promise<void> {
  const variaveis = await this.workflowService.requestProcessVariables();
  const formData = variaveis['json_formulario']
    ? JSON.parse(variaveis['json_formulario'])
    : {};

  console.log('🧪 formData recebido:', formData);

  this.codest = formData.codest || '001'; // força um código de teste
  this.carregarVagas();
}


  carregarVagas(): void {
    this.estacionamentoService.getVagasPorEstacionamento(this.codest).subscribe((vagas) => {
      this.vagas = vagas;
    });
  }

  excluirVagas(): void {
    this.vagas = this.vagas.filter((vaga) => vaga.vagaLivre);
    console.warn('🚮 Todas as vagas ocupadas foram excluídas.');
  }
}
