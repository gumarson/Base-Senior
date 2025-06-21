import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/estacionamento',
    pathMatch: 'full',
  },
  {
    path: 'estacionamento',
    loadChildren: () =>
      import('./modules/estacionamento/estacionamento.module').then(
        (m) => m.EstacionamentoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
