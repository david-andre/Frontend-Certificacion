import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { ServiciosAddComponent } from './components/servicios/servicios-add/servicios-add.component';
import { ServiciosEditComponent } from './components/servicios/servicios-edit/servicios-edit.component';

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
    ServiciosAddComponent,
    ServiciosEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ClientesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
