import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient) { }

  login(datosLogin: {email: string, password: string}): Observable<any>{ // Habría que sacar esto a una interfaz
    return this.http.post('http://localhost:3200/login', datosLogin)
  }

  registro(){
    const datosRegistro = {
      nombre: 'Charles Falco',
      username: 'cfalco',
      password: '1234',
      email: 'cfalco@gmail.com'
    }
    return this.http.post('http://localhost:3200/signup', datosRegistro)
  }
}
