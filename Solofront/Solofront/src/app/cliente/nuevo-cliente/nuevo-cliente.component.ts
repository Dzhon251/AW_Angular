import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { NgIf } from '@angular/common';
declare const Swal: any;

@Component({
  selector: 'app-nuevo-cliente',
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css'
})
export class NuevoClienteComponent implements OnInit {
  tituloFormulario = "Registro de nuevo cliente";
  id: number = 0;
  editar: boolean = false;

  clienteforms: FormGroup = new FormGroup({});

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private parametros: ActivatedRoute

  ) {
    this.clienteforms = new FormGroup({
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      
    });

    this.parametros.params.subscribe((parametros) => {
      if (parametros['parametro']) {
        //actualizar
        this.tituloFormulario = "Actualizar datos del cliente";
        this.id = parametros['parametro'];
        this.editar = true;
        this.clienteService.unCliente(this.id).subscribe((cliente) => {
          this.clienteforms.patchValue(cliente);
        });
      } else { //nuevo cliente
        this.clienteforms.reset();
      }
    });
  }

  ngOnInit(): void {

  }

  guardarCliente() {
    if (this.clienteforms.invalid) {
      console.log("Formulario inválido");
      return;
    }
    Swal.fire({
      title: 'Desea guardar la informacion del cliente?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
      icon: 'question',
    }).then((result: any) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (this.editar == true) {
          const cliente = this.clienteforms.value;
          cliente.id = this.id;
          this.clienteService
            .putCliente(cliente)
            .subscribe((cliente) => {
              if (cliente == null) {
                Swal.fire('Clientes', 'Error al guardar', 'error');
              }
              Swal.fire('Clientes', 'Se guardo con exito', 'success');
              this.clienteforms.reset();
              this.router.navigate(['']);
            });
        } else {
          const cliente = this.clienteforms.value;
          this.clienteService
            .guardarCliente(cliente)
            .subscribe((uncliente) => {
              Swal.fire('Clientes', 'Se guardo con exito', 'success');
              this.clienteforms.reset();
              this.router.navigate(['']);
            });
        }
      } else if (result.isDenied) {
        Swal.fire('Clientes', 'El usuario cancelo la operacion', 'success');
      }
    });
  }
}