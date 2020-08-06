import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/Servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../../services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios-edit',
  templateUrl: './servicios-edit.component.html',
  styleUrls: ['./servicios-edit.component.css'],
})
export class ServiciosEditComponent implements OnInit {
  servicio: Servicio = {
    id: 0,
    nombre: '',
    costo: 0,
    descripcion: '',
    idempresa: 0,
  };

  constructor(
    private serviciosService: ServiciosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    this.serviciosService.getServicio(params.id).subscribe(
      (res) => {
        console.log(res);
        this.servicio = res;
      },
      (err) => {
        Swal.fire(
          'Ha ocurrido un error',
          'No se encontró el servicio',
          'error'
        );
        console.error(err);
        this.router.navigate(['/empresas']);
      }
    );
  }

  updateServicio() {
    this.serviciosService
      .updateServicio(this.servicio.id, this.servicio)
      .subscribe((res) => {
        console.log(res);
        Swal.fire(
          'Cambios realizados',
          'Los cambios se han realizado exitosamente',
          'success'
        );
        this.router.navigate(['/empresas/' + this.servicio.idempresa]);
      });
    (err) => {
      Swal.fire(
        'Ha ocurrido un error',
        'No se ha podido guardar los cambios',
        'error'
      );
      console.error(err);
    };
  }
}
