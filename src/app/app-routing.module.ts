import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';
import { ClientesFormComponent } from './components/clientes/clientes-form/clientes-form.component';
import { EmpresasListComponent } from './components/empresas/empresas-list/empresas-list.component';
import { EmpresasFormComponent } from './components/empresas/empresas-form/empresas-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { ServiciosListComponent } from './components/servicios/servicios-list/servicios-list.component';
import { ServiciosFormComponent } from './components/servicios/servicios-form/servicios-form.component';
import { PedidoAddComponent } from './components/pedidos/pedido-add/pedido-add.component';
import { PedidosListComponent } from './components/pedidos/pedidos-list/pedidos-list.component';
import { DetallesListComponent } from './components/detalles/detalles-list/detalles-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'register',
    component: LoginRegisterComponent,
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
  {
    path: 'clientes/:id',
    component: PedidosListComponent,
  },
  {
    path: 'empresas',
    component: EmpresasListComponent,
  },
  {
    path: 'empresas/add',
    component: EmpresasFormComponent,
  },
  {
    path: 'empresas/edit/:id',
    component: EmpresasFormComponent,
  },
  {
    path: 'empresas/:id',
    component: ServiciosListComponent,
  },
  {
    path: 'servicios/add/:id',
    component: ServiciosFormComponent,
  },
  {
    path: 'servicios/edit/:id',
    component: ServiciosFormComponent,
  },
  {
    path: 'servicios',
    component: ServiciosListComponent,
  },
  {
    path: 'pedidos/add',
    component: PedidoAddComponent,
  },
  {
    path: 'pedidos/:id',
    component: DetallesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
