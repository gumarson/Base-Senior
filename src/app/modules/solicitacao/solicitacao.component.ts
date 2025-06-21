import { Component, OnInit } from '@angular/core';
import { WfFormData } from 'src/app/core/service/workflow/workflow-cockpit/dist/workflow-cockpit';
import { WorkflowService } from 'src/app/core/service/workflow/workflow.service';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrl: './solicitacao.component.scss'
})
export class SolicitacaoComponent implements OnInit {

  constructor(private wfService: WorkflowService) {}

  ngOnInit(): void {
    this.wfService.onSubmit(this.submitForm.bind(this));
  }

  submitForm(): WfFormData {
    return {
      formData: {
      }
    }
  }

}
