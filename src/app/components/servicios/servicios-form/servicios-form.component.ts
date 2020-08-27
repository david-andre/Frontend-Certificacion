import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/Servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../../services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios-form',
  templateUrl: './servicios-form.component.html',
  styleUrls: ['./servicios-form.component.css']
})
export class ServiciosFormComponent implements OnInit {
  id = this.activatedRoute.snapshot.params.id;

  servicio: Servicio = {
    id: 0,
    nombre: '',
    costo: 0,
    descripcion: '',
    idempresa: 0,
  };

  edit: boolean = false;

  constructor(
    private serviciosService: ServiciosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.router.url === `/servicios/add/${this.id}`) {
      this.servicio.idempresa = this.id
    }
    else{
      this.serviciosService.getServicio(this.id).subscribe(
        (res) => {
          console.log(res);
          this.servicio = res;
          this.edit = true;
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
  }

  saveNewServicio() {
    delete this.servicio.id;
    this.serviciosService.saveServicio(this.servicio).subscribe(
      (res) => {
        console.log(res);
        Swal.fire(
          'Creación exitosa',
          'Un nuevo servicio ha sido creado',
          'success'
        );
        this.router.navigate(['/empresas/' + this.id]);
      },
      (err) => {
        Swal.fire(
          'Ha ocurrido un error',
          'No se ha podido crear el servicio',
          'error'
        );
        console.error(err);
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
