import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Cliente } from '../models/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  API_URI = 'http://daparedes15-001-site1.htempurl.com/api';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  getClientes() {
    return this.http.get(`${this.API_URI}/clientes`);
  }
  getCliente(id: string) {
    return this.http.get(`${this.API_URI}/clientes/GetOne/${id}`);
  }
  saveCliente(cliente: Cliente) {
    return this.http.post(`${this.API_URI}/clientes`, cliente);
  }
  deleteCliente(id: string) {
    return this.http.delete(`${this.API_URI}/clientes/${id}`);
  }
  updateCliente(
    id: string | number,
    updatedCliente: Cliente
  ): Observable<Cliente> {
    return this.http.put(`${this.API_URI}/clientes/${id}`, updatedCliente);
  }
  getClienteByUser(id: string) {
    return this.http.get(`${this.API_URI}/clientes/getbyuser/${id}`);
  }
}
