import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { ClientesFormComponent } from './components/clientes/clientes-form/clientes-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes',
    pathMatch: 'full',
  },
  {
    path: 'clientes',
    component: ClientesListComponent,
  },
  {
    path: 'clientes/add',
    component: ClientesFormComponent,
  },
  {
    path: 'clientes/edit/:id',
    component: ClientesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
