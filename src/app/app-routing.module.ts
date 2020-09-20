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
import { AuthGuard } from './services/auth.guard';
import { ClientesProfileComponent } from './components/clientes/clientes-profile/clientes-profile.component';
import { PedidosEmpresasComponent } from './components/pedidos-empresas/pedidos-empresas.component';
import { PedidosServiciosComponent } from './components/pedidos-servicios/pedidos-servicios.component';
import { EstadisticasClientesComponent } from './components/estadisticas/estadisticas-clientes/estadisticas-clientes.component';
import { EstadisticasEmpresasComponent } from './components/estadisticas/estadisticas-empresas/estadisticas-empresas.component';
import { DetalleEmpresaComponent } from './components/detalle-empresa/detalle-empresa.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: MainPageComponent,
  },
  {
    path: 'register',
    component: LoginRegisterComponent,
  },
  {
    path: 'clientes',
    component: ClientesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ClientesProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes/add',
    component: ClientesFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes/edit/:id',
    component: ClientesFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientes/:id',
    component: PedidosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos-empresa/:id',
    component: PedidosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'empresas',
    component: EmpresasListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'empresas/add',
    component: EmpresasFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'empresas/edit/:id',
    component: EmpresasFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'empresas/:id',
    component: ServiciosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'servicios/add/:id',
    component: ServiciosFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'servicios/edit/:id',
    component: ServiciosFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'servicios',
    component: ServiciosListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos/add',
    component: PedidoAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos/:id',
    component: DetallesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos-empresas',
    component: PedidosEmpresasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos-servicios/:id',
    component: PedidosServiciosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estadisticas/clientes',
    component: EstadisticasClientesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'estadisticas/empresas',
    component: EstadisticasEmpresasComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detalle/:id',
    component: DetalleEmpresaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
