import { Component, OnInit } from '@angular/core';

import { ClientesService } from '../../../services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css'],
})
export class ClientesListComponent implements OnInit {
  clientes: any = [];
  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this.clientesService.getClientes().subscribe(
      (res) => {
        this.clientes = res;
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

  deleteCliente(id: string) {
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
        this.clientesService.deleteCliente(id).subscribe(
          (res) => {
            console.log(res);
            Swal.fire('Eliminado', 'El cliente ha sido eliminado', 'success');
            this.getClientes();
          },
          (err) => {
            Swal.fire(
              'Ha ocurrido un error',
              'No se pudo eliminar al cliente',
              'error'
            );
            console.error(err);
          }
        );
      }
    });
  }
}
