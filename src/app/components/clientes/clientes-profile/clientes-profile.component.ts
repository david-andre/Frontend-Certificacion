import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../services/clientes.service';
import { Cliente } from 'src/app/models/Cliente';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-profile',
  templateUrl: './clientes-profile.component.html',
  styleUrls: ['./clientes-profile.component.css'],
})
export class ClientesProfileComponent implements OnInit {
  loggedCliente: any = {
    token: '',
    user: 0,
  };
  cliente: any = {
    id: 0,
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    ciudad: '',
    direccion: '',
    idusuario: 0,
  };
  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var usuario = localStorage.getItem('valid');
    this.loggedCliente = JSON.parse(usuario);
    this.getCliente();
  }

  getCliente() {
    this.clientesService.getClienteByUser(this.loggedCliente.user).subscribe(
      (res) => {
        this.cliente = res;
        console.log(res);
      },
      (err) => {
        this.router.navigate(['/clientes/add']);
        console.error(err);
      }
    );
  }
}
