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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ClientesFormComponent,
    ClientesListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [ClientesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
