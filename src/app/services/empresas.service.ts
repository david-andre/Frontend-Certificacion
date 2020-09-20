import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Empresa } from '../models/Empresa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  API_URI = 'http://daparedes15-001-site1.htempurl.com/api';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  getEmpresas() {
    return this.http.get(`${this.API_URI}/empresas`);
  }
  getEmpresa(id: string) {
    return this.http.get(`${this.API_URI}/empresas/getone/${id}`);
  }
  saveEmpresa(empresa: Empresa) {
    return this.http.post(`${this.API_URI}/empresas`, empresa);
  }
  deleteEmpresa(id: string) {
    return this.http.delete(`${this.API_URI}/empresas/${id}`);
  }
  updateEmpresa(
    id: string | number,
    updatedEmpresa: Empresa
  ): Observable<Empresa> {
    return this.http.put(
      `${this.API_URI}/empresas/${id}`,
      updatedEmpresa
    );
  }
  getEmpresasByUser(id: string) {
    return this.http.get(`${this.API_URI}/empresas/getbyuser/${id}`);
  }
}
