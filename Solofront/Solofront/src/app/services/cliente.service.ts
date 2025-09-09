import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { ICliente } from '../interfaces/icliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly apiUrl = 'https://localhost:7112/api/clientes';

  constructor(
    private http: HttpClient
  ) { }

  //Método para obtener todos los clientes
  getClientes(): Observable<ICliente[]> {

    var clientes = this.http.get<ICliente[]>(this.apiUrl).pipe(catchError(this.manejoError));
    console.log(clientes);
    return clientes;
  }

  manejoError(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || "Error de red"
    return throwError(() => {
      new Error(msg);
    })
  }

  guardarCliente(cliente: ICliente): Observable<ICliente> {
    return this.http
      .post<ICliente>(this.apiUrl, cliente)
      .pipe(catchError(this.manejoError)
      );
  }

  putCliente(cliente: ICliente): Observable<ICliente> {
    return this.http
      .put<ICliente>(`${this.apiUrl}/${cliente.id}`, cliente)
      .pipe(catchError(this.manejoError));
  }

  unCliente(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.manejoError)
    );
  }

  eliminarCliente(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.manejoError)
    );
  }
}
