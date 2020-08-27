import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetallePedidosService } from '../../../services/detalle-pedidos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detalles-list',
  templateUrl: './detalles-list.component.html',
  styleUrls: ['./detalles-list.component.css'],
})
export class DetallesListComponent implements OnInit {
  detalles: any = [];

  constructor(
    private detallePedidoService: DetallePedidosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.id) {
      this.detallePedidoService.getDetalles(params.id).subscribe(
        (res) => {
          console.log(res);
          this.detalles = res;
        },
        (err) => {
          Swal.fire(
            'Ha ocurrido un error',
            'No se encontró el pedido',
            'error'
          );
          console.error(err);
          this.router.navigate(['/clientes']);
        }
      );
    }
  }
}
