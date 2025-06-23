import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';

import { InputComponent } from '@senior-hcm-service-tower/hst-input';
import { FormularioSolicitacaoComponent } from './components/formulario-solicitacao/formulario-solicitacao.component';
import { FormularioVeiculoComponent } from './components/formulario-veiculo/formulario-veiculo.component';


const NG_COMPONENTS = [
  ButtonModule,
  AvatarModule,
  PanelModule,
  FieldsetModule,
  InplaceModule,
  InputTextModule,
  InputIconModule,
  IconFieldModule,
  DropdownModule,
  CardModule,
  DividerModule,
  CalendarModule,
  InputTextareaModule,
  CheckboxModule,
  RadioButtonModule,
  DialogModule,
  TableModule,
  InputGroupModule,
  InputGroupAddonModule,
  BadgeModule,
  TagModule,
  InputComponent
];

const CUSTOM_COMPONENTS = [
  FormularioSolicitacaoComponent
];

@NgModule({
  declarations: [
    ...CUSTOM_COMPONENTS,
    FormularioSolicitacaoComponent,
    FormularioVeiculoComponent
  ],
  imports: [
    CommonModule,
    ...NG_COMPONENTS,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ...NG_COMPONENTS,
    ReactiveFormsModule,
    FormsModule,
    FormularioVeiculoComponent,
    ...CUSTOM_COMPONENTS
  ]
  })
export class SharedModule { }
