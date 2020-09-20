import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../../services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
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
    private clientesService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var usuario = localStorage.getItem('valid');
    this.loggedCliente = JSON.parse(usuario);
    this.cliente.idusuario = this.loggedCliente.user;
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.clientesService.getCliente(params.id).subscribe(
        (res) => {
          console.log(res);
          this.cliente = res;
          this.edit = true;
        },
        (err) => {
          Swal.fire(
            'Ha ocurrido un error',
            'No se encontró el cliente',
            'error'
          );
          console.error(err);
          this.router.navigate(['/home']);
        }
      );
    }
  }

  saveNewCliente() {
    delete this.cliente.id;

    this.clientesService.saveCliente(this.cliente).subscribe(
      (res) => {
        console.log(res);
        Swal.fire(
          'Creación exitosa',
          'Un nuevo cliente ha sido creado',
          'success'
        );
        this.router.navigate(['/profile']);
      },
      (err) => {
        Swal.fire(
          'Ha ocurrido un error',
          'No se ha podido crear el cliente',
          'error'
        );
        console.error(err);
      }
    );
  }

  updateCliente() {
    this.clientesService
      .updateCliente(this.cliente.id, this.cliente)
      .subscribe((res) => {
        console.log(res);
        Swal.fire(
          'Cambios realizados',
          'Los cambios se han realizado exitosamente',
          'success'
        );
        this.router.navigate(['/profile']);
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
