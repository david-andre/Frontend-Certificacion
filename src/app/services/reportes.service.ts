import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  API_URI = 'http://daparedes15-001-site1.htempurl.com/api';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  getReporteServcios(id: number, month: number, year: number) {
    return this.http.get(
      `${this.API_URI}/Reportes/GetByServicio?idUsuario=${id}&month=${month}&year=${year}`
    );
  }

  getReporteEmpresas(id: number, month: number, year: number) {
    return this.http.get(
      `${this.API_URI}/Reportes/GetByEmpresa?idUsuario=${id}&month=${month}&year=${year}`
    );
  }

  getReporteMontos(id: number) {
    return this.http.get(`${this.API_URI}/Reportes/GetMonto?idUsuario=${id}`);
  }
}
