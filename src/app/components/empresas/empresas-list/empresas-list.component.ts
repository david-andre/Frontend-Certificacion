import { Component, OnInit } from '@angular/core';

import { EmpresasService } from '../../../services/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.css']
})
export class EmpresasListComponent implements OnInit {

  empresas: any = [];
  constructor(private empresasService: EmpresasService) {}

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas() {
    this.empresasService.getEmpresas().subscribe(
      (res) => {
        this.empresas = res;
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

  deleteEmpresa(id: string) {
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
        this.empresasService.deleteEmpresa(id).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('Eliminado', 'La empresa ha sido eliminada', 'success');
            this.getEmpresas();
          },
          (err) => {
            Swal.fire(
              'Ha ocurrido un error',
              'No se pudo eliminar la empresa',
              'error'
            );
            console.error(err);
          }
        );
      }
    });
  }

}
