import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../../services/empresas.service';
import { ServiciosService } from '../../../services/servicios.service';
import { DetallePedidosService } from '../../../services/detalle-pedidos.service';
import { ReportesService } from '../../../services/reportes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estadisticas-empresas',
  templateUrl: './estadisticas-empresas.component.html',
  styleUrls: ['./estadisticas-empresas.component.css'],
})
export class EstadisticasEmpresasComponent implements OnInit {
  loggedCliente: any = {
    token: '',
    user: 0,
  };
  popularServicios: any = [];
  detalles: any = [];
  empresas: any = [];
  servicios: any = [];
  nombres: any = [];
  numPedidos: any = [];
  //reportes 2
  servicios2: any = [];
  reporte2: any = [];
  //reportes 3
  empresas3: any = [];
  reporte3: any = [];
  //reportes 4
  reporte4: any = [];
  misServiciosLabels: any = [];
  misServiciosData: any = [];
  // chart js data
  chartOptions = {
    responsive: true,
    legend: {
      labels: {
        // This more specific font property overrides the global property
        fontColor: 'white',
      },
    },
  };
  chartData = [{ data: this.numPedidos, label: 'Pedidos' }];
  chartLabels = ['Mars', 'April'];

  chartData2 = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500, 0, 0, 50], label: 'Account C' },
  ];
  chartData3 = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500, 0, 0, 50], label: 'Account C' },
  ];
  chartLabels2 = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  chartData4 = [{ data: this.numPedidos, label: 'Pedidos' }];
  chartLabels4 = ['Mars', 'April'];

  constructor(
    private empresasService: EmpresasService,
    private serviciosService: ServiciosService,
    private detallesService: DetallePedidosService,
    private reportesService: ReportesService
  ) {}

  ngOnInit(): void {
    var usuario = localStorage.getItem('valid');
    this.loggedCliente = JSON.parse(usuario);
    this.getEmpresas();
    this.getByServicio();
    this.getByEmpresa();
    this.getByMonto();
  }
  getEmpresas() {
    this.empresasService.getEmpresasByUser(this.loggedCliente.user).subscribe(
      (res) => {
        this.empresas = res;
        // console.log(this.empresas);
        this.serviciosService.getAllServicios().subscribe(
          (res) => {
            this.servicios = res;
            this.servicios.forEach((ser) => {
              this.empresas.forEach((emp) => {
                if (ser.idempresa === emp.idempresa) {
                  this.popularServicios.push(ser);
                }
              });
            });
            // console.log(this.popularServicios);
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
                this.popularServicios.forEach((element) => {
                  this.numPedidos.push(element.Count);
                  this.nombres.push(element.nombre);
                });
                this.numPedidos.push(0);
                //console.log(this.numPedidos);
                //console.log(this.nombres);
                this.chartLabels = this.nombres;
                this.chartData = [{ data: this.numPedidos, label: 'Pedidos' }];
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

  getByServicio() {
    this.reportesService.getReporteMontos(this.loggedCliente.user).subscribe(
      (res) => {
        this.servicios2 = res;
        this.servicios2.forEach((element) => {
          element.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        });
        this.chartLabels2.forEach((element, index) => {
          this.reportesService
            .getReporteServcios(this.loggedCliente.user, index + 1, 2020)
            .subscribe(
              (res) => {
                this.reporte2 = res;
                if (this.reporte2.length > 0) {
                  this.servicios2.forEach((item) => {
                    this.reporte2.forEach((element) => {
                      if (item.nombre === element.nombre) {
                        item.data[index] = element.pedidos;
                      }
                    });
                  });
                }
              },
              (err) => {
                console.error(err);
              }
            );
        });
        console.log('datos2');
        console.log(this.servicios2);
        this.chartData2 = [];
        this.servicios2.forEach((element) => {
          this.chartData2.push({ data: element.data, label: element.nombre });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getByEmpresa() {
    this.empresasService.getEmpresasByUser(this.loggedCliente.user).subscribe(
      (res) => {
        this.empresas3 = res;
        console.log("Empresas 3")
        console.log(this.empresas3)
        this.empresas3.forEach((element) => {
          element.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        });
        console.log("Empresas 3 con datos")
        console.log(this.empresas3)
        console.log(this.servicios2);
        this.chartLabels2.forEach((element, index) => {
          this.reportesService
            .getReporteEmpresas(this.loggedCliente.user, index + 1, 2020)
            .subscribe(
              (res) => {
                console.log("reporte "+index)
                console.log(res)
                this.reporte3 = res;
                if (this.reporte3.length > 0) {
                  this.empresas3.forEach((item) => {
                    this.reporte3.forEach((element) => {
                      if (item.nombre === element.nombre) {
                        item.data[index] = element.pedidos;
                      }
                    });
                  });
                }
              },
              (err) => {
                console.error(err);
              }
            );
        });
        console.log('datos3');
        console.log(this.empresas3);
        this.chartData3 = [];
        this.empresas3.forEach((element) => {
          this.chartData3.push({ data: element.data, label: element.nombre });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getByMonto() {
    this.reportesService.getReporteMontos(this.loggedCliente.user).subscribe(
      (res) => {
        console.log('datos4');
        console.log(res);
        this.reporte4 = res;
        this.reporte4.forEach((element) => {
          this.misServiciosLabels.push(element.nombre);
          this.misServiciosData.push(element.monto);
        });
        console.log(this.misServiciosData);
        console.log(this.misServiciosLabels);
        this.chartLabels4 = this.misServiciosLabels;
        this.chartData4 = [{ data: this.misServiciosData, label: 'Pedidos' }];
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
