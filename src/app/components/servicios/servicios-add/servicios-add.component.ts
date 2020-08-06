import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/Servicio';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../../../services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicios-add',
  templateUrl: './servicios-add.component.html',
  styleUrls: ['./servicios-add.component.css']
})
export class ServiciosAddComponent implements OnInit {

  idempresa = this.activatedRoute.snapshot.params.id;

  servicio: Servicio = {
    id: 0,
    nombre: '',
    costo: 0,
    descripcion: '',
    idempresa: this.idempresa
  };

  constructor(
    private serviciosService: ServiciosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

  }

  saveNewServicio() {
    delete this.servicio.id;
    this.serviciosService.saveServicio(this.servicio).subscribe(
      (res) => {
        console.log(res);
        Swal.fire(
          'Creación exitosa',
          'Una nueva servicio ha sido creada',
          'success'
        );
        this.router.navigate(['/empresas/'+this.idempresa]);
      },
      (err) => {
        Swal.fire(
          'Ha ocurrido un error',
          'No se ha podido crear la servicio',
          'error'
        );
        console.error(err);
      }
    );
  }
}
