import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { ICliente } from '../interfaces/icliente';
import { RouterLink } from '@angular/router';

declare const Swal: any;

@Component({
  selector: 'app-cliente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  listaClientes!: ICliente[];

  constructor(
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }

  eliminarCliente(id: number) {
    Swal.fire({
      title: "Clientes",
      text: "¿Está seguro que desea eliminar este cliente?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(id).subscribe((id) => {
          if (id > 0) {
            this.cargarClientes();
            Swal.fire(
              'Cliente Eliminado!',
              'Gracias por confiar en nuestros servicios!.',
              'success'
            );
          }
        });
      }
    });
  }

  variables_sesion(id: number) {
    sessionStorage.setItem('id_cliente', id.toString());
  }
  eliminarvariable() {
    sessionStorage.removeItem('id_cliente');
  }

}
