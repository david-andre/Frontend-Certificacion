import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Pedido } from '../models/Pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  API_URI = 'http://daparedes15-001-site1.htempurl.com/api';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  getPedidosByClient(id: string) {
    return this.http.get(`${this.API_URI}/pedidos/getbyclient/${id}`);
  }
  getPedido(id: string) {
    return this.http.get(`${this.API_URI}/pedidos/getone/${id}`);
  }
  savePedido(pedido: Pedido) {
    return this.http.post(`${this.API_URI}/pedidos`, pedido);
  }
  deletePedido(id: string) {
    return this.http.delete(`${this.API_URI}/pedidos/${id}`);
  }
  updatePedido(
    id: string | number,
    updatedPedido: Pedido
  ): Observable<Pedido> {
    return this.http.put(`${this.API_URI}/pedidos/${id}`, updatedPedido);
  }
}
