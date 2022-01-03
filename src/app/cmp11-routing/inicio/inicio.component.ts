import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  listaUsuarios: Array<any> = []
  subscription: Subscription | null = null

  constructor(private http: HttpClient) // el http tendría que ir en un servicio
  { }
 

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users')
      .subscribe((usuarios: any) => {
        this.listaUsuarios = usuarios
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
