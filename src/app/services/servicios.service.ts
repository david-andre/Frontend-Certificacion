import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Servicio } from '../models/Servicio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  API_URI = 'http://daparedes15-001-site1.htempurl.com/api';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  getServicios(id: string) {
    return this.http.get(`${this.API_URI}/servicios/getbybussiness/${id}`);
  }
  getServicio(id: string) {
    return this.http.get(`${this.API_URI}/servicios/getone/${id}`);
  }
  getAllServicios() {
    return this.http.get(`${this.API_URI}/servicios`);
  }
  saveServicio(servicio: Servicio) {
    return this.http.post(`${this.API_URI}/servicios`, servicio);
  }
  deleteServicio(id: string) {
    return this.http.delete(`${this.API_URI}/servicios/${id}`);
  }
  updateServicio(
    id: string | number,
    updatedServicio: Servicio
  ): Observable<Servicio> {
    return this.http.put(`${this.API_URI}/servicios/${id}`, updatedServicio);
  }
}
