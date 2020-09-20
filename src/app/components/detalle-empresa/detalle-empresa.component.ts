import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DetallePedidosService } from '../../services/detalle-pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-empresa',
  templateUrl: './detalle-empresa.component.html',
  styleUrls: ['./detalle-empresa.component.css'],
})
export class DetalleEmpresaComponent implements OnInit {
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
          console.log(this.detalles);
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
