import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../services/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-empresas',
  templateUrl: './pedidos-empresas.component.html',
  styleUrls: ['./pedidos-empresas.component.css'],
})
export class PedidosEmpresasComponent implements OnInit {
  loggedCliente: any = {
    token: '',
    user: 0,
  };
  empresas: any = [];
  constructor(private empresasService: EmpresasService) {}

  ngOnInit(): void {
    var usuario = localStorage.getItem('valid');
    this.loggedCliente = JSON.parse(usuario);
    this.getEmpresas();
  }

  getEmpresas() {
    this.empresasService.getEmpresasByUser(this.loggedCliente.user).subscribe(
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
}
