import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { DetallePedidosService } from '../../../services/detalle-pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css'],
})
export class PedidosListComponent implements OnInit {
  pedidos: any = [];
  fecha: string;
  toggle: boolean =
    this.router.url === `/clientes/${this.activatedRoute.snapshot.params.id}`;
  idcliente = this.activatedRoute.snapshot.params.id;
  constructor(
    private pedidosService: PedidosService,
    private detalle: DetallePedidosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url === `/clientes/${this.idcliente}`) {
      this.getPedidosByCliente();
    } else {
      this.getPedidosByEmpresa();
    }
  }

  getPedidosByCliente() {
    const params = this.activatedRoute.snapshot.params;
    this.pedidosService.getPedidosByClient(params.id).subscribe(
      (res) => {
        this.pedidos = res;
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
  getPedidosByEmpresa() {
    const params = this.activatedRoute.snapshot.params;
    this.detalle.getDetalleByServicio(params.id).subscribe(
      (res) => {
        this.pedidos = res;
        console.log(this.pedidos);
        console.log(this.fecha);
        console.log(this.pedidos[0].Pedido.fechaPeticion);
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
