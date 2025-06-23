import { Component, ViewChild } from '@angular/core';
import { FormularioVeiculoComponent } from 'src/app/shared/components/formulario-veiculo/formulario-veiculo.component';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent {
  @ViewChild('formularioVeiculo') formularioVeiculo!: FormularioVeiculoComponent;

  onSubmit(): void {
    const formData = this.formularioVeiculo.retornarValoresFormulario();
    console.log('Dados do formulário (Gestor):', formData);
  }
}
