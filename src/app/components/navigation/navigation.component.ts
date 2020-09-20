import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from 'src/app/models/Cliente';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  cart: number = 0;
  loggedCliente: any = {
    token: '',
    user: 0,
  };
  cliente: any = {};
  constructor(
    private clientesService: ClientesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    var usuario = localStorage.getItem('valid');
    this.loggedCliente = JSON.parse(usuario);
    this.getCliente();
    this.getSessionData();
  }

  getSessionData() {
    if (sessionStorage.detalles == null) {
    } else {
      var array = sessionStorage.getItem('detalles');
      array = JSON.parse(array);
      this.cart = array.length;
    }
  }
  logOut() {
    localStorage.removeItem('valid');
    sessionStorage.removeItem('detalles');
  }

  getCliente() {
    this.clientesService.getClienteByUser(this.loggedCliente.user).subscribe(
      (res) => {
        this.cliente = res;
      },
      (err) => {
        this.router.navigate(['/clientes/add']);
        console.error(err);
      }
    );
  }
}
