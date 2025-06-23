import { Component, ViewChild } from '@angular/core';
import { FormularioVeiculoComponent } from 'src/app/shared/components/formulario-veiculo/formulario-veiculo.component';

@Component({
  selector: 'app-revisao',
  templateUrl: './revisao.component.html',
  styleUrls: ['./revisao.component.scss']
})
export class RevisaoComponent {
  @ViewChild('formularioVeiculo') formularioVeiculo!: FormularioVeiculoComponent;

  onSubmit(): void {
    const formData = this.formularioVeiculo.retornarValoresFormulario();
    console.log('Dados do formulário (Revisão):', formData);
  }
}
