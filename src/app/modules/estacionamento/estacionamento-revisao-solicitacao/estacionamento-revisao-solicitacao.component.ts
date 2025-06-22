import { Component, OnInit, ViewChild } from '@angular/core';
import { FormularioSolicitacaoComponent } from '@components/formulario-solicitacao/formulario-solicitacao.component';
import { WfFormData } from '@core/service/workflow/workflow-cockpit/dist/workflow-cockpit';
import { WorkflowService } from '@core/service/workflow/workflow.service';

@Component({
  selector: 'app-estacionamento-revisao-solicitacao',
  templateUrl: './estacionamento-revisao-solicitacao.component.html',
  styleUrls: ['./estacionamento-revisao-solicitacao.component.scss'],
})
export class EstacionamentoRevisaoSolicitacaoComponent implements OnInit {
  @ViewChild(FormularioSolicitacaoComponent)
  formularioRef!: FormularioSolicitacaoComponent;

  constructor(private workflowService: WorkflowService) {}

  ngOnInit(): void {
    this.workflowService.onSubmit(() => this.getFormData());
  }

  getFormData(): WfFormData {
    const formData = this.formularioRef?.formulario?.value;
    console.log('📦 Dados enviados no submit (revisao):', formData);

    return {
      json_formulario: JSON.stringify(formData),
    } as unknown as WfFormData;
  }

  finalizar(): void {
    // Dispara a submissão
    const submitButton = document.querySelector(
      '[data-wf-submit]'
    ) as HTMLElement;
    if (submitButton) {
      submitButton.click();
    } else {
      console.warn('⚠️ Botão com [data-wf-submit] não encontrado.');
    }
  }
}
