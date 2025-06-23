import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-veiculo',
  templateUrl: './formulario-veiculo.component.html',
  styleUrls: ['./formulario-veiculo.component.scss']
})
export class FormularioVeiculoComponent implements OnInit {
  @Input() onlyView = false;
  @Output() formData = new EventEmitter<any>();

  veiculoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.veiculoForm = this.fb.group({
      nome: [{ value: '', disabled: this.onlyView }, Validators.required],
      placa: [{ value: '', disabled: this.onlyView }, Validators.required],
      cor: [{ value: '', disabled: this.onlyView }, Validators.required],
      tipo: [{ value: '', disabled: this.onlyView }, Validators.required],
      observacao: [{ value: '', disabled: this.onlyView }]
    });
  }

  /** Padrão da Adriana — necessário para os componentes pais */
  retornarValoresFormulario(): any {
    return this.veiculoForm.getRawValue();
  }

  /** Para uso direto do botão dentro do componente, se necessário */
  submitFormulario(): void {
    if (this.veiculoForm.valid) {
      const valores = this.retornarValoresFormulario();
      console.log('FormData:', JSON.stringify(valores));
      this.formData.emit(valores);
    } else {
      console.warn('Formulário inválido.');
    }
  }
}
