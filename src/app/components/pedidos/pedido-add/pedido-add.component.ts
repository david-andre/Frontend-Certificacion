import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';
import { DetallePedido } from 'src/app/models/DetallePedido';
import { ClientesService } from '../../../services/clientes.service';
import { ServiciosService } from '../../../services/servicios.service';
import { DetallePedidosService } from '../../../services/detalle-pedidos.service';
import { PedidosService } from '../../../services/pedidos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedido-add',
  templateUrl: './pedido-add.component.html',
  styleUrls: ['./pedido-add.component.css'],
})
export class PedidoAddComponent implements OnInit {
  clientes: any = [];
  cliente: any = {
    idcliente: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    idusuario: 0,
  };
  loggedCliente: any = {
    token: '',
    user: 0,
  };
  detalles: any = [];
  pedido: Pedido = {
    id: 0,
    fechaPeticion: '',
    estado: 'En Espera',
    fechaEjecucion: null,
    costo: 0,
    idcliente: 0,
  };
  detalle: DetallePedido = {
    id: 0,
    idpedido: 0,
    idservicio: 0,
  };

  edit: boolean = false;

  constructor(
    private pedidosService: PedidosService,
    private router: Router,
    private clientesService: ClientesService,
    private serviciosService: ServiciosService,
    private detallesService: DetallePedidosService
  ) {}

  ngOnInit(): void {
    var usuario = localStorage.getItem('valid');
    this.loggedCliente = JSON.parse(usuario);
    this.getClientes();
    this.getCliente();
    this.getCurrentDate();
    this.getSessionData();
  }

  saveNewPedido() {
    if (sessionStorage.getItem('detalles') === null) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });

      Toast.fire({
        icon: 'error',
        title: 'Tu pedido esta vacio',
      });
    } else {
      delete this.pedido.id;
      this.pedido.idcliente = this.cliente.idcliente;
      this.pedidosService.savePedido(this.pedido).subscribe(
        (res) => {
          this.detalles.forEach((element) => {
            this.detallesService.saveDetalle(element).subscribe(
              (res) => {
                console.log(res);
              },
              (err) => {
                console.error(err);
              }
            );
          });
          console.log(res);
          sessionStorage.removeItem('detalles');
          Swal.fire(
            'Creación exitosa',
            'Un nuevo pedido ha sido creado',
            'success'
          );
          this.router.navigate(['/profile']);
        },
        (err) => {
          Swal.fire(
            'Ha ocurrido un error',
            'No se ha podido crear el pedido',
            'error'
          );
          console.error(err);
        }
      );
    }
  }

  getClientes() {
    this.clientesService.getClientes().subscribe(
      (res) => {
        this.clientes = res;
        console.log(this.clientes);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error',
          text: 'Verifique la conexión al servidor',
        });
        console.error(err);
      }
    );
  }

  getCurrentDate() {
    var n = new Date();
    //Año
    var y = n.getFullYear();
    //Mes
    var m = n.getMonth() + 1;
    //Día
    var d = n.getDate();
    this.pedido.fechaPeticion = d + '/' + m + '/' + y;
  }

  async getSessionData() {
    var idDetalles: any = [];
    if (sessionStorage.detalles == null) {
      idDetalles = [];
    } else {
      var array = sessionStorage.getItem('detalles');
      array = JSON.parse(array);
      idDetalles = array;
      await this.getDetalles(idDetalles);
    }
  }

  getDetalles(idDetalles) {
    idDetalles.forEach((element) => {
      this.serviciosService.getServicio(element).subscribe(
        (res) => {
          this.detalles.push(res);
          this.pedido.costo = this.detalles.reduce((total, element) => {
            return parseFloat(element.costo) + total;
          }, 0);
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }

  getCliente() {
    this.clientesService.getClienteByUser(this.loggedCliente.user).subscribe(
      (res) => {
        this.cliente = res;
        console.log(res);
      },
      (err) => {
        this.router.navigate(['/clientes/add']);
        console.error(err);
      }
    );
  }

  deleteDetalles() {
    sessionStorage.removeItem('detalles');
    this.detalles = [];
    this.pedido.costo = 0;
  }
}
