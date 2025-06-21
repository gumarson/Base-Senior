
// import { Component, OnInit } from '@angular/core';
// import { WfFormData } from 'src/app/core/service/workflow/workflow-cockpit/dist/workflow-cockpit';
// import { WorkflowService } from 'src/app/core/service/workflow/workflow.service';
// import { EstacionamentoService } from '../services/estacionamento.service';

// @Component({
//   selector: 'app-estacionamento-list',
//   templateUrl: './estacionamento-list.component.html',
//   styleUrls: ['./estacionamento-list.component.scss']
// })
// export class EstacionamentoListComponent implements OnInit {

//   estacionamentos: any[] = [];
//   vagas: any[] = [];
//   selectedVaga: any = null;
//   selectedCodest: string | null = null;

//   constructor(
//     private estacionamentoService: EstacionamentoService,
//     private wfService: WorkflowService
//   ) {}

//   ngOnInit(): void {
//     this.estacionamentos = this.estacionamentoService.getEstacionamentosMock();

//     this.estacionamentoService.getVagasComDisponibilidade().subscribe((data) => {
//       this.vagas = data;
//     });

//     this.wfService.onSubmit(this.submitForm.bind(this));
//   }

//   abrirSolicitacao(vaga: any) {
//     this.selectedVaga = vaga;
//     this.logRegistro(vaga);
//   }

//   chamarAdmin(vaga: any) {
//     this.selectedVaga = vaga;
//     this.logRegistro(vaga);
//   }

//   private logRegistro(vaga: any) {
//     console.log(`Registro enviado:
// codest: ${vaga.codest}
// codvag: ${vaga.codvag}
// desest: ${vaga.desest}
// modvei: ${vaga.modvei}
// numcad: ${vaga.numcad}
// numemp: ${vaga.numemp}
// plavei: ${vaga.plavei}
// tipcol: ${vaga.tipcol}
// CorVei: ${vaga.CorVei}`);
//   }

//   submitForm(): WfFormData {
//     if (!this.selectedVaga) {
//       return { formData: {} };
//     }

//     return {
//       formData: {
//         codest: this.selectedVaga.codest,
//         codvag: this.selectedVaga.codvag,
//         desest: this.selectedVaga.desest,
//         modvei: this.selectedVaga.modvei,
//         numcad: this.selectedVaga.numcad,
//         numemp: this.selectedVaga.numemp,
//         plavei: this.selectedVaga.plavei,
//         tipcol: this.selectedVaga.tipcol,
//         CorVei: this.selectedVaga.CorVei
//       }
//     };
//   }

//   getVagasFiltradas(): any[] {
//     if (!this.selectedCodest) return [];
//     return this.vagas.filter(v => v.codest === this.selectedCodest);
//   }

//   isVagaLivre(vaga: any): boolean {
//     return !vaga.modvei || !vaga.plavei || !vaga.CorVei;
//   }

//   temVagaLivre(): boolean {
//     return this.getVagasFiltradas().some(v => this.isVagaLivre(v));
//   }

//   handleBotaoPrincipal() {
//     const vaga = this.getVagasFiltradas().find(v => this.isVagaLivre(v));
//     if (vaga) {
//       this.abrirSolicitacao(vaga);
//     } else {
//       const primeiraOcupada = this.getVagasFiltradas()[0];
//       this.chamarAdmin(primeiraOcupada);
//     }
//   }
// }




// @Component({
//   selector: 'app-estacionamento-list',
//   templateUrl: './estacionamento-list.component.html',
//   styleUrls: ['./estacionamento-list.component.scss']
// })
// export class EstacionamentoListComponent implements OnInit {
//   estacionamentos: any[] = [];
//   vagas: any[] = [];
//   selectedVaga: any = null;
//   selectedCodest: string | null = null;
//   vagasCarregadas: boolean = false;

//   constructor(
//     private estacionamentoService: EstacionamentoService,
//     private wfService: WorkflowService
//   ) {}

//   ngOnInit(): void {
//     this.estacionamentos = this.estacionamentoService.getEstacionamentosMock();
//     this.wfService.onSubmit(this.submitForm.bind(this));
//   }

//   onCodestChange(): void {
//     if (!this.selectedCodest) return;

//     this.vagasCarregadas = false;
//     this.estacionamentoService.getVagasPorEstacionamento(this.selectedCodest).subscribe((data) => {
//       this.vagas = data;
//       this.vagasCarregadas = true;
//     });
//   }

//   abrirSolicitacao(vaga: any) {
//     this.selectedVaga = vaga;
//     this.logRegistro(vaga);
//   }

//   chamarAdmin(vaga: any) {
//     this.selectedVaga = vaga;
//     this.logRegistro(vaga);
//   }

//   private logRegistro(vaga: any) {
//     console.log(`Registro enviado:
// codest: ${vaga.codest}
// codvag: ${vaga.codvag}
// desest: ${vaga.desest}
// modvei: ${vaga.modvei}
// numcad: ${vaga.numcad}
// numemp: ${vaga.numemp}
// plavei: ${vaga.plavei}
// tipcol: ${vaga.tipcol}
// CorVei: ${vaga.CorVei}`);
//   }

//   submitForm(): WfFormData {
//     if (!this.selectedVaga) return { formData: {} };

//     return {
//       formData: {
//         codest: this.selectedVaga.codest,
//         codvag: this.selectedVaga.codvag,
//         desest: this.selectedVaga.desest,
//         modvei: this.selectedVaga.modvei,
//         numcad: this.selectedVaga.numcad,
//         numemp: this.selectedVaga.numemp,
//         plavei: this.selectedVaga.plavei,
//         tipcol: this.selectedVaga.tipcol,
//         CorVei: this.selectedVaga.CorVei
//       }
//     };
//   }

//   getVagasFiltradas(): any[] {
//     if (!this.selectedCodest) return [];
//     return this.vagas.filter(v => v.codest === this.selectedCodest);
//   }

//   isVagaLivre(vaga: any): boolean {
//     return vaga.vagaLivre === true;
//   }

//   temVagaLivre(): boolean {
//     return this.getVagasFiltradas().some(v => this.isVagaLivre(v));
//   }

//   handleBotaoPrincipal() {
//     const vaga = this.getVagasFiltradas().find(v => this.isVagaLivre(v));
//     if (vaga) {
//       this.abrirSolicitacao(vaga);
//     } else {
//       const primeiraOcupada = this.getVagasFiltradas()[0];
//       this.chamarAdmin(primeiraOcupada);
//     }
//   }

//   normalizarCor(cor: string | null | undefined): string {
//     if (!cor) return '#f4f4f4';
//     return cor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
//   }
// }

// ... imports permanecem iguais

import { Component, OnInit } from '@angular/core';
import { WfFormData } from 'src/app/core/service/workflow/workflow-cockpit/dist/workflow-cockpit';
import { WorkflowService } from 'src/app/core/service/workflow/workflow.service';
import { EstacionamentoService } from '../services/estacionamento.service';
import cores from 'src/assets/cores.json';

function getRgbValues(colorName: string): string {
  const fakeDiv = document.createElement('div');
  fakeDiv.style.color = colorName;
  document.body.appendChild(fakeDiv);

  const rgb = getComputedStyle(fakeDiv).color;
  document.body.removeChild(fakeDiv);

  // "rgb(255, 0, 0)" → "255, 0, 0"
  return rgb.replace(/[^\d,]/g, '');
}


@Component({
  selector: 'app-estacionamento-list',
  templateUrl: './estacionamento-list.component.html',
  styleUrls: ['./estacionamento-list.component.scss']
})
export class EstacionamentoListComponent implements OnInit {
  estacionamentos: any[] = [];
  vagas: any[] = [];
  selectedVaga: any = null;
  selectedCodest: string | null = null;
  vagasCarregadas: boolean = false;

  constructor(
    private estacionamentoService: EstacionamentoService,
    private wfService: WorkflowService
  ) {}

  ngOnInit(): void {
    this.estacionamentos = this.estacionamentoService.getEstacionamentosMock();
    this.wfService.onSubmit(this.submitForm.bind(this));
  }

  onCodestChange(): void {
    if (!this.selectedCodest) return;

    this.vagasCarregadas = false;
    this.estacionamentoService.getVagasPorEstacionamento(this.selectedCodest).subscribe((data) => {
      this.vagas = data;
      this.vagasCarregadas = true;
    });
  }

  abrirSolicitacao(vaga: any) {
    this.selectedVaga = vaga;
    this.logRegistro(vaga);
  }

  chamarAdmin(vaga: any) {
    this.selectedVaga = vaga;
    this.logRegistro(vaga);
  }

  private logRegistro(vaga: any) {
    console.log(`Registro enviado:
codest: ${vaga.codest}
codvag: ${vaga.codvag}
desest: ${vaga.desest}
modvei: ${vaga.modvei}
numcad: ${vaga.numcad}
numemp: ${vaga.numemp}
plavei: ${vaga.plavei}
tipcol: ${vaga.tipcol}
CorVei: ${vaga.CorVei}`);
  }

  submitForm(): WfFormData {
    if (!this.selectedVaga) return { formData: {} };

    return {
      formData: {
        codest: this.selectedVaga.codest,
        codvag: this.selectedVaga.codvag,
        desest: this.selectedVaga.desest,
        modvei: this.selectedVaga.modvei,
        numcad: this.selectedVaga.numcad,
        numemp: this.selectedVaga.numemp,
        plavei: this.selectedVaga.plavei,
        tipcol: this.selectedVaga.tipcol,
        CorVei: this.selectedVaga.CorVei
      }
    };
  }

  getVagasFiltradas(): any[] {
    if (!this.selectedCodest) return [];
    return this.vagas.filter(v => v.codest === this.selectedCodest);
  }

  isVagaLivre(vaga: any): boolean {
    return vaga.vagaLivre === true;
  }

  temVagaLivre(): boolean {
    return this.getVagasFiltradas().some(v => this.isVagaLivre(v));
  }

  handleBotaoPrincipal() {
    const vaga = this.getVagasFiltradas().find(v => this.isVagaLivre(v));
    if (vaga) {
      this.abrirSolicitacao(vaga);
    } else {
      const primeiraOcupada = this.getVagasFiltradas()[0];
      this.chamarAdmin(primeiraOcupada);
    }
  }

normalizarCor(cor: string | null | undefined): string {
  if (!cor) return '#f4f4f4';

  const nomeNormalizado = cor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  // Busca no JSON se existe tradução
  const corEmIngles = (cores as Record<string, string>)[nomeNormalizado] || nomeNormalizado;

  // Constrói o RGBA e testa suporte
  const colorCss = `rgba(${getRgbValues(corEmIngles)}, 0.4)`;
  if (CSS.supports('color', colorCss)) return colorCss;

  console.warn(`[Color] "${nomeNormalizado}" não reconhecida — fallback para cinza claro`);
  return '#f4f4f4';
}
}
