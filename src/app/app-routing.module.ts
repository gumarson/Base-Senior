import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/solicitacao',
    pathMatch: 'full',
  },
  {
    path: 'solicitacao',
    loadChildren: () =>
      import('./modules/solicitacao/solicitacao.module').then(
        (m) => m.SolicitacaoModule
      ),
  },
  {
    path: 'revisao',
    loadChildren: () =>
      import('./modules/revisao/revisao.module').then((m) => m.RevisaoModule),
  },
  {
    path: 'analise',
    loadChildren: () =>
      import('./modules/analise/analise.module').then((m) => m.AnaliseModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
