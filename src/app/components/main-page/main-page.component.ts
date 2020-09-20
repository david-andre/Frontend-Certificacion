import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { DetallePedidosService } from '../../services/detalle-pedidos.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  servicios: any = [];
  popularServicios: any = [];
  detalles: any = [];
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
    private serviciosService: ServiciosService,
    private detallesService: DetallePedidosService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('valid') === null) {
      this.show = true;
    }
    this.getLoggedUser();
    this.getNewServicios();
    this.getPoularServicios();
  }

  getNewServicios() {
    this.serviciosService.getAllServicios().subscribe(
      (res) => {
        this.servicios = res;
        this.servicios.splice(0, this.servicios.length - 3);
        this.servicios.reverse();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  getPoularServicios() {
    this.serviciosService.getAllServicios().subscribe(
      (res) => {
        this.popularServicios = res;
        this.popularServicios.forEach((element) => {
          element.Count = 0;
        });
        this.detallesService.getAllDetalles().subscribe(
          (res) => {
            this.detalles = res;
            this.popularServicios.forEach((item) => {
              this.detalles.forEach((element) => {
                if (element.idservicio === item.idservicio) {
                  item.Count = item.Count + 1;
                }
              });
            });
            this.popularServicios.sort((a, b) => b.Count - a.Count);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
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
