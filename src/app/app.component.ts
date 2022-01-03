import { Component, OnInit } from '@angular/core';
import { AuthService } from './cmp07-servicios/servicios/auth.service';
import { EventosService } from './cmp07-servicios/servicios/eventos.service';
import { AutenticacionService } from './cmp10-autenticacion/autenticacion.service';

import jwtDecode from 'jwt-decode';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = false
  formLogin: FormGroup
  disabledLoginBtn: boolean = false

  constructor(private auth: AuthService,
    private eventos: EventosService,
    private autenticacionService: AutenticacionService) {
      this.formLogin = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
      })
     }

  ngOnInit(): void {
    // this.isLoggedIn = this.auth.hasToken()

    this.eventos.authEvent$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn
    })

    this.eventos.authEvent$.emit(this.auth.hasToken())

  }

  logIn(): void {
    // const token = Math.random().toString().slice(2) //slice para que nos quite el 0, del .math
    // this.auth.setToken(token)

    this.disabledLoginBtn = true
    const datosLogin = this.formLogin.value
    this.autenticacionService.login(datosLogin)
      .subscribe({
        next: (datos: any) => {
          const token = datos.token
          const payload = jwtDecode(token) // Para reconvertir el token y recibir los parámetros que le hayamos dado en el backend (no datos sensibles)
          console.log(payload)
          this.auth.setToken(token)

          this.formLogin.reset()
          this.disabledLoginBtn = false
        },
        error: (err) => {
          console.log(err)
          this.disabledLoginBtn = false
        }
      })

  }

  logOut(): void {
    this.auth.delToken()
  }


}
