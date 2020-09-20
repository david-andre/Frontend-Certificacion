import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-servicios',
  templateUrl: './pedidos-servicios.component.html',
  styleUrls: ['./pedidos-servicios.component.css'],
})
export class PedidosServiciosComponent implements OnInit {
  servicios: any = [];
  constructor(
    private serviciosService: ServiciosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getServicios();
  }

  getServicios() {
    const params = this.activatedRoute.snapshot.params;
    this.serviciosService.getServicios(params.id).subscribe(
      (res) => {
        this.servicios = res;
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
