import { Component, ViewChild } from '@angular/core';
import { FormularioVeiculoComponent } from 'src/app/shared/components/formulario-veiculo/formulario-veiculo.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  @ViewChild(FormularioVeiculoComponent) formularioVeiculo!: FormularioVeiculoComponent;

  onSubmit(): void {
    const formData = this.formularioVeiculo.retornarValoresFormulario();
    console.log('Dados do formulário (Cadastro):', formData);
  }
}
