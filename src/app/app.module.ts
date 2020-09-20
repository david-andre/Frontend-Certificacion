import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ClientesFormComponent } from './components/clientes/clientes-form/clientes-form.component';
import { ClientesListComponent } from './components/clientes/clientes-list/clientes-list.component';

import { ClientesService } from './services/clientes.service';
import { from } from 'rxjs';
import { EmpresasListComponent } from './components/empresas/empresas-list/empresas-list.component';
import { EmpresasFormComponent } from './components/empresas/empresas-form/empresas-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { ServiciosListComponent } from './components/servicios/servicios-list/servicios-list.component';
import { ServiciosFormComponent } from './components/servicios/servicios-form/servicios-form.component';
import { PedidoAddComponent } from './components/pedidos/pedido-add/pedido-add.component';
import { PedidosListComponent } from './components/pedidos/pedidos-list/pedidos-list.component';
import { DetallesListComponent } from './components/detalles/detalles-list/detalles-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './services/auth.guard';
import { ClientesProfileComponent } from './components/clientes/clientes-profile/clientes-profile.component';
import { Navigation2Component } from './components/navigation2/navigation2.component';
import { PedidosEmpresasComponent } from './components/pedidos-empresas/pedidos-empresas.component';
import { PedidosServiciosComponent } from './components/pedidos-servicios/pedidos-servicios.component';
import { DetalleEmpresaComponent } from './components/detalle-empresa/detalle-empresa.component';
import { EstadisticasEmpresasComponent } from './components/estadisticas/estadisticas-empresas/estadisticas-empresas.component';
import { EstadisticasClientesComponent } from './components/estadisticas/estadisticas-clientes/estadisticas-clientes.component';
import { MyBarChartComponent } from './my-bar-chart/my-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ClientesFormComponent,
    ClientesListComponent,
    EmpresasListComponent,
    EmpresasFormComponent,
    MainPageComponent,
    LoginRegisterComponent,
    ServiciosListComponent,
    ServiciosFormComponent,
    PedidoAddComponent,
    PedidosListComponent,
    DetallesListComponent,
    FooterComponent,
    ClientesProfileComponent,
    Navigation2Component,
    PedidosEmpresasComponent,
    PedidosServiciosComponent,
    DetalleEmpresaComponent,
    EstadisticasEmpresasComponent,
    EstadisticasClientesComponent,
    MyBarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
  ],
  providers: [ClientesService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
