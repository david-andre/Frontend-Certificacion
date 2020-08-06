import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios.service';
import { EmpresasService } from '../../../services/empresas.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.component.html',
  styleUrls: ['./servicios-list.component.css'],
})
export class ServiciosListComponent implements OnInit {
  servicios: any = [];
  empresa: any = [];
  idempresa = this.activatedRoute.snapshot.params.id;
  constructor(
    private serviciosService: ServiciosService,
    private empresasService: EmpresasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.id) {
      this.getServicios();
    } else {
      this.getAllServicios();
    }
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

  getAllServicios() {
    this.serviciosService.getAllServicios().subscribe(
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

  deleteServicio(id: string) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Los cambios no podran ser revertidos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.serviciosService.deleteServicio(id).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('Eliminado', 'El servicio ha sido eliminado', 'success');
            this.getServicios();
          },
          (err) => {
            Swal.fire(
              'Ha ocurrido un error',
              'No se pudo eliminar el servicio',
              'error'
            );
            console.error(err);
          }
        );
      }
    });
  }
}
