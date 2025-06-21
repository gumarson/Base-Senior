// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class EstacionamentoService {

//   constructor(private http: HttpClient) { }

//   getVagas(): Observable<any[]> {
//     return this.http.get<any[]>('/assets/mock/vagas.json');
//   }
// }

// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class EstacionamentoService {
//   constructor() {}

//   private buscarEstacionamento = {
//     contents: [
//       { codest: '1', desest: 'ESTACIONAMENTO REAL', qtdvag: '5' },
//       { codest: '2', desest: 'ESTACIONAMENTO DO MANEZINHO', qtdvag: '1' },
//       { codest: '3', desest: 'ESTACIONAMENTO AZUL', qtdvag: '2' }
//     ]
//   };

//   private buscarVagas = {
//     contents: [
//       {
//         codest: '1',
//         codvag: 1,
//         desest: 'ESTACIONAMENTO REAL',
//         modvei: 'GOL',
//         numcad: '1',
//         numemp: '1',
//         plavei: 'ABD2225',
//         tipcol: 'PF',
//         CorVei: 'Branco'
//       },
//       {
//         codest: '1',
//         codvag: 2,
//         desest: 'ESTACIONAMENTO REAL',
//         modvei: 'UNO',
//         numcad: '2',
//         numemp: '1',
//         plavei: 'XYZ9999',
//         tipcol: 'PF',
//         CorVei: 'Prata'
//       },
//       {
//         codest: '2',
//         codvag: 101,
//         desest: 'ESTACIONAMENTO DO MANEZINHO',
//         modvei: 'KA',
//         numcad: '3',
//         numemp: '2',
//         plavei: 'ABC1234',
//         tipcol: 'PJ',
//         CorVei: 'Preto'
//       }
//     ]
//   };

//   getEstacionamentosMock(): any[] {
//     return this.buscarEstacionamento.contents;
//   }

//   getVagasComDisponibilidade(): Observable<any[]> {
//     const estacionamentos = this.buscarEstacionamento.contents;
//     const vagas = this.buscarVagas.contents;

//     const vagasComStatus = vagas.map(vaga => {
//       const est = estacionamentos.find(e => e.codest === vaga.codest);
//       const total = Number(est?.qtdvag || 0);
//       const ocupadas = vagas.filter(v => v.codest === vaga.codest).length;

//       return {
//         ...vaga,
//         temVaga: ocupadas < total
//       };
//     });

//     return of(vagasComStatus);
//   }
// }

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import mock from 'src/assets/mock.json';

@Injectable({
  providedIn: 'root',
})
export class EstacionamentoService {
  constructor() {}

  getEstacionamentosMock(): any[] {
    return mock.rubi['com.senior.teste']['com.senior.estacionamento']
      .vagaEstacionamento.buscarEstacionamento.contents;
  }

  getVagasMock(): any[] {
    return mock.rubi['com.senior.teste']['com.senior.estacionamento']
      .vagaEstacionamento.buscarVagas.contents;
  }

  getVagasPorEstacionamento(codest: string): Observable<any[]> {
    const estacionamentos = this.getEstacionamentosMock();
    const vagas = this.getVagasMock();

    const est = estacionamentos.find((e) => e.codest === codest);
    const totalVagas = Number(est?.qtdvag || 0);

    // Ajustar o map para garantir que CorVei seja string válida
const vagasOcupadas = vagas
  .filter((v) => v.codest === codest)
  .map((v) => {
    console.log('[getVagasPorEstacionamento] Cor original:', v.CorVei);
    return {
      ...v,
      vagaLivre: false,
      CorVei: typeof v.CorVei === 'string' ? v.CorVei : null,
    };
  });


    const vagasLivres = totalVagas - vagasOcupadas.length;

    for (let i = 0; i < vagasLivres; i++) {
      vagasOcupadas.push({
        codvag: `LIVRE-${i + 1}`,
        codest,
        desest: est?.desest,
        vagaLivre: true,
      });
    }

    return of(vagasOcupadas);
  }
}
