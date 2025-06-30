import { Component, OnInit, ViewChild } from '@angular/core';
import { WfFormData } from 'src/app/core/service/workflow/workflow-cockpit/dist/workflow-cockpit';
import { WorkflowService } from 'src/app/core/service/workflow/workflow.service';
import { FormularioVagaVeiculoComponent } from 'src/app/shared/components/formulario-vaga-veiculo/formulario-vaga-veiculo.component';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoComponent implements OnInit {
  @ViewChild(FormularioVagaVeiculoComponent, { static: true })
  formularioVagaComponent!: FormularioVagaVeiculoComponent;

  constructor(private wfService: WorkflowService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.wfService.onSubmit(this.submitForm.bind(this));
    } catch (error) {
      console.error(error);
    }
  }

  submitForm(): WfFormData {
    if (!this.formularioVagaComponent.validarForm()) {
      this.wfService.abortSubmit();
    }

    const dadosFormulario = this.formularioVagaComponent.retornarValoresFormulario();

    return {
      formData: {
        dadosVeiculo: JSON.stringify(dadosFormulario)
      }
    };
  }
}
