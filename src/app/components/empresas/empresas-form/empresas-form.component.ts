import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/Empresa';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresasService } from '../../../services/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.css'],
})
export class EmpresasFormComponent implements OnInit {
  empresa: Empresa = {
    id: 0,
    nombre: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    idusuario: 0,
  };

  loggedCliente: any = {
    token: '',
    user: 0,
  };
  edit: boolean = false;

  constructor(
    private empresasService: EmpresasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var usuario = localStorage.getItem('valid');
    this.loggedCliente = JSON.parse(usuario);
    this.empresa.idusuario = this.loggedCliente.user;
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.id) {
      this.empresasService.getEmpresa(params.id).subscribe(
        (res) => {
          console.log(res);
          this.empresa = res;
          this.edit = true;
        },
        (err) => {
          Swal.fire(
            'Ha ocurrido un error',
            'No se encontró la empresa',
            'error'
          );
          console.error(err);
          this.router.navigate(['/empresas']);
        }
      );
    }
  }

  saveNewEmpresa() {
    delete this.empresa.id;
    this.empresasService.saveEmpresa(this.empresa).subscribe(
      (res) => {
        console.log(res);
        Swal.fire(
          'Creación exitosa',
          'Una nueva empresa ha sido creada',
          'success'
        );
        this.router.navigate(['/empresas']);
      },
      (err) => {
        Swal.fire(
          'Ha ocurrido un error',
          'No se ha podido crear la empresa',
          'error'
        );
        console.error(err);
      }
    );
  }

  updateEmpresa() {
    this.empresasService
      .updateEmpresa(this.empresa.id, this.empresa)
      .subscribe((res) => {
        console.log(res);
        Swal.fire(
          'Cambios realizados',
          'Los cambios se han realizado exitosamente',
          'success'
        );
        this.router.navigate(['/empresas']);
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
