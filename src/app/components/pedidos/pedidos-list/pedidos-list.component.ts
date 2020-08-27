import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-list',
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.css'],
})
export class PedidosListComponent implements OnInit {
  pedidos: any = [];
  idcliente = this.activatedRoute.snapshot.params.id;
  constructor(
    private pedidosService: PedidosService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    const params = this.activatedRoute.snapshot.params;
    this.pedidosService.getPedidos(params.id).subscribe(
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
}
