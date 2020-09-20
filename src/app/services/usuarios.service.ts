import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  API_URI = 'http://daparedes15-001-site1.htempurl.com/api';
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  saveUser(ususario: Usuario) {
    return this.http.post(`${this.API_URI}/usuarios`, ususario);
  }

  getUsers() {
    return this.http.get(`${this.API_URI}/usuarios`);
  }

  getUser(id: string) {
    return this.http.get(`${this.API_URI}/usuarios/${id}`);
  }

  logUser(ususario: Usuario) {
    return this.http.post(`${this.API_URI}/login/authenticate`, ususario);
  }

  loggedIn() {
    if (localStorage.getItem('valid') != null) {
      return true;
    }
    return false;
  }

}
