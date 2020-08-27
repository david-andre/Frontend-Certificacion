import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DetallePedido } from '../models/DetallePedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetallePedidosService {
  API_URI = 'https://localhost:44309/api';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  getDetalles(id: string) {
    return this.http.get(`${this.API_URI}/detallepedidos/getbypedido/${id}`);
  }
  getDetalle(id: string) {
    return this.http.get(`${this.API_URI}/detallepedidos/getone/${id}`);
  }
  saveDetalle(detalle: DetallePedido) {
    return this.http.post(`${this.API_URI}/detallepedidos`, detalle);
  }
}
