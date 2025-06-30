import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkflowService } from 'src/app/core/service/workflow/workflow.service';
import { FormularioVagaVeiculoComponent } from 'src/app/shared/components/formulario-vaga-veiculo/formulario-vaga-veiculo.component';
import { WfFormData, WfProcessStep } from 'src/app/core/service/workflow/workflow-cockpit/dist/workflow-cockpit';

@Component({
  selector: 'app-analise',
  templateUrl: './analise.component.html',
  styleUrls: ['./analise.component.scss']
})
export class AnaliseComponent implements OnInit {
  @ViewChild(FormularioVagaVeiculoComponent, { static: true })
  formularioVagaComponent!: FormularioVagaVeiculoComponent;

  dadosVeiculo: any = {};

  constructor(private wfService: WorkflowService) {}

  ngOnInit(): void {
    this.wfService.onSubmit(this.submitForm.bind(this));
    this.carregarDados();
  }


  async carregarDados(): Promise<void> {
    try {
      const formData = await this.wfService.requestProcessVariables();
      this.dadosVeiculo = JSON.parse(formData?.dadosVeiculo || '{}');
      this.formularioVagaComponent.preencherForm(this.dadosVeiculo);

      console.log('Dados do veículo carregados:', formData);
    
    } catch (error) {
      console.error('Erro ao carregar dados do formulário:', error);
    }
  }

  submitForm(step: WfProcessStep): WfFormData {
    return {
      formData: {
        dadosVeiculo: JSON.stringify(this.dadosVeiculo)
      }
    };
  }
}
