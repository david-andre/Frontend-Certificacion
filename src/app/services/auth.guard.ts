import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.usuariosService.loggedIn()) {
      return true;
    }
    this.router.navigate(['/register']);
    return false;
  }
}
