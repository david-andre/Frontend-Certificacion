import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.component.html',
  styleUrls: ['./servicios-list.component.css'],
})
export class ServiciosListComponent implements OnInit {
  servicios: any = [];
  detalles: any = [];
  idempresa = this.activatedRoute.snapshot.params.id;
  constructor(
    private serviciosService: ServiciosService,
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
      this.getDetalles();
      console.log(this.detalles);
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
              'No se puede eliminar',
              'Existen clientes que ya lo han pedido',
              'error'
            );
            console.error(err);
          }
        );
      }
    });
  }

  addServicio(id: string) {
    this.detalles.push(id);
    sessionStorage.setItem('detalles', JSON.stringify(this.detalles));
    console.log(this.detalles);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Servicio Añadido',
      showConfirmButton: false,
      timer: 2000,
    });
    this.router.navigate(['/pedidos/add']);
  }

  getDetalles() {
    if (sessionStorage.detalles == null) {
      this.detalles = [];
    } else {
      var array = sessionStorage.getItem('detalles');
      array = JSON.parse(array);
      this.detalles = array;
    }
  }
}
