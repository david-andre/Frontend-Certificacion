import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { ServiciosService } from '../../../services/servicios.service';
import { DetallePedidosService } from '../../../services/detalle-pedidos.service';
import { PedidosService } from '../../../services/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estadisticas-clientes',
  templateUrl: './estadisticas-clientes.component.html',
  styleUrls: ['./estadisticas-clientes.component.css'],
})
export class EstadisticasClientesComponent implements OnInit {
  loggedCliente: any = {
    token: '',
    user: 0,
  };
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
  servicios: any = [];
  misServicios: any = [];
  pedidos: any = [];
  detalles: any = [];
  misdetalles: any = [];
  serviciosAux: any = [];
  serviciosEst: any = [];
  misServiciosData: any = [];
  misServiciosLabels: any = [];
  chartOptions = {
    responsive: true,
  };
  chartData = [{ data: this.misServiciosData, label: 'Pedidos' }];
  chartLabels = ['Mars', 'April'];

  constructor(
    private clientesService: ClientesService,
    private serviciosService: ServiciosService,
    private detallesService: DetallePedidosService,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    var usuario = localStorage.getItem('valid');
    this.loggedCliente = JSON.parse(usuario);
    this.getServicios();
  }
  getServicios() {
    this.clientesService.getClienteByUser(this.loggedCliente.user).subscribe(
      (res) => {
        this.cliente = res;
        console.log(this.cliente.idcliente);
        this.pedidosService
          .getPedidosByClient(this.cliente.idcliente)
          .subscribe(
            (res) => {
              this.pedidos = res;
              console.log(this.pedidos);
              this.detallesService.getAllDetalles().subscribe(
                (res) => {
                  this.detalles = res;
                  this.pedidos.forEach((item) => {
                    this.detalles.forEach((element) => {
                      if (element.idpedido === item.idpedido) {
                        this.misdetalles.push(element);
                      }
                    });
                  });
                  console.log(this.misdetalles);
                  this.serviciosService.getAllServicios().subscribe((res) => {
                    this.servicios = res;
                    this.servicios.forEach((item) => {
                      this.misdetalles.forEach((element) => {
                        if (element.idservicio === item.idservicio) {
                          this.misServicios.push(item);
                        }
                      });
                    });
                    this.serviciosAux = Array.from(new Set(this.misServicios));
                    console.log(this.serviciosAux);
                    this.serviciosAux.forEach((element) => {
                      element.Count = 0;
                    });
                    this.misServicios.forEach((item) => {
                      this.serviciosAux.forEach((element) => {
                        if (element.idservicio === item.idservicio) {
                          element.Count = element.Count + 1;
                        }
                      });
                    });
                    this.serviciosAux.forEach((element) => {
                      this.misServiciosData.push(element.Count);
                      this.misServiciosLabels.push(element.nombre);
                    });
                    console.log(this.misServiciosData);
                    console.log(this.misServiciosLabels);
                    this.misServiciosData.push(0);
                    this.chartLabels = this.misServiciosLabels;
                    this.chartData = [
                      { data: this.misServiciosData, label: 'Pedidos' },
                    ];
                  });
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
}
