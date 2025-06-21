import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-solicitacao',
  templateUrl: './formulario-solicitacao.component.html',
  styleUrls: ['./formulario-solicitacao.component.scss']
})
export class FormularioSolicitacaoComponent implements OnInit {
  @Input() readonly: boolean = false;
  @Input() codest: string | null = null;
  @Input() desest: string | null = null;
  @Output() formDataChange = new EventEmitter<any>();

  formulario!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      codest: ['', Validators.required],
      codvag: ['', Validators.required],
      desest: ['', Validators.required],
      modvei: ['', Validators.required],
      numcad: ['', Validators.required],
      numemp: ['', Validators.required],
      plavei: ['', Validators.required],
      tipcol: ['', Validators.required],
      CorVei: ['', Validators.required],
    });

    this.formulario.patchValue({
      codest: this.codest,
      desest: this.desest
    });

    this.formulario.valueChanges.subscribe((value) => {
      if (this.formulario.valid) {
        this.formDataChange.emit(value);
      }
    });
  }

  processar(): void {
    if (this.formulario.valid) {
      console.log('✅ Dados enviados ao submit:', this.formulario.value);
      this.formDataChange.emit(this.formulario.value);
    } else {
      console.warn('⚠️ Formulário inválido');
    }
  }
}
