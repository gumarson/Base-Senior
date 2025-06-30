import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-vaga-veiculo',
  templateUrl: './formulario-vaga-veiculo.component.html',
  styleUrls: ['./formulario-vaga-veiculo.component.scss']
})
export class FormularioVagaVeiculoComponent implements OnInit {
  @Input() modoRevisao = false;
  formularioVeiculo: FormGroup;

  constructor(private fb: FormBuilder) {
    console.log('[formulario-vaga-veiculo] Constructor chamado');
    this.formularioVeiculo = this.fb.group({
      modelo: ['', Validators.required],
      ano: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      placa: ['', Validators.required],
      cor: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('[formulario-vaga-veiculo] ngOnInit | modoRevisao:', this.modoRevisao);
    if (this.modoRevisao) {
      this.desabilitarForm();
    }
  }

  validarForm(): boolean {
    console.log('[formulario-vaga-veiculo] Validando formulário');
    Object.keys(this.formularioVeiculo.controls).forEach((campo) => {
      this.formularioVeiculo.controls[campo].markAsDirty();
      this.formularioVeiculo.controls[campo].updateValueAndValidity();
    });
    const isValid = this.formularioVeiculo.valid;
    console.log('[formulario-vaga-veiculo] Formulário válido?', isValid);
    return isValid;
  }

  retornarValoresFormulario(): any {
    const valores = this.formularioVeiculo.value;
    console.log('[formulario-vaga-veiculo] Valores retornados:', valores);
    return valores;
  }

  preencherForm(valores: any): void {
    console.log('[formulario-vaga-veiculo] Preenchendo formulário com:', valores);
    if (valores) {
      this.formularioVeiculo.patchValue(valores);
    }
  }

  desabilitarForm(): void {
    console.log('[formulario-vaga-veiculo] Desabilitando formulário');
    this.formularioVeiculo.disable();
  }
}
