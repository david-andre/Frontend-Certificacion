import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import Swal from 'sweetalert2';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  login = true;
  usuario: Usuario = {
    id: 0,
    usuario: '',
    contrasena: '',
    email: '',
  };
  logInUser: Usuario = {
    usuario: '',
    contrasena: '',
  };
  usuarios: any = [];
  validUser: any = {
    token: '',
    user: {},
  };
  show: boolean = false;
  loggedCliente: any = {
    token: '',
    user: 0,
  };
  loggedUsuario: any = {
    usuario: '',
    contrasena: '',
    email: '',
  };
  constructor(
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('valid') === null) {
      this.show = true;
    }
    this.getLoggedUser();
  }

  async Toast() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    await Toast.fire({
      icon: 'success',
      title: 'Iniciando Sesión',
    });
    this.router.navigate(['/clientes']);
  }

  Toggle() {
    this.login = !this.login;
  }

  saveNewUsuario() {
    delete this.usuario.id;
    this.usuariosService.saveUser(this.usuario).subscribe(
      (res) => {
        console.log(res);
        Swal.fire(
          'Creación exitosa',
          'Tu cuenta ha sido creada',
          'success'
        );
        this.login = !this.login;
      },
      (err) => {
        Swal.fire(
          'Ha ocurrido un error',
          'No se ha podido crear el usuario',
          'error'
        );
        console.error(err);
      }
    );
  }

  logIn() {
    this.usuariosService.logUser(this.logInUser).subscribe(
      async (res) => {
        this.validUser = res;
        var token = {
          token: this.validUser.token,
          user: this.validUser.user.idusuario,
        };
        console.log(token);
        localStorage.setItem('valid', JSON.stringify(token));
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        await Toast.fire({
          icon: 'success',
          title: 'Iniciando Sesión',
        });
        this.router.navigate(['/profile']);
      },
      (err) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Usuario y/o contraseña inválidos'
        })
        console.error(err);
      }
    );
  }
  getLoggedUser() {
    if (localStorage.getItem('valid') != null) {
      var usuario = localStorage.getItem('valid');
      this.loggedCliente = JSON.parse(usuario);
      this.usuariosService.getUser(this.loggedCliente.user).subscribe(
        (res) => {
          this.loggedUsuario = res;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }

  logOut() {
    localStorage.removeItem('valid');
  }
}
