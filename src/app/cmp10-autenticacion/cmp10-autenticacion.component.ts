import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { socket } from 'src/main';
import { AuthService } from '../cmp07-servicios/servicios/auth.service';

@Component({
  selector: 'app-cmp10-autenticacion',
  templateUrl: './cmp10-autenticacion.component.html',
  styleUrls: ['./cmp10-autenticacion.component.css']
})
export class Cmp10AutenticacionComponent implements OnInit {
  formNoticia: FormGroup
  noticias: Array<any> = []

  constructor(private http: HttpClient,
    private authService: AuthService,
    private zone: NgZone) { // Cuando hay cambio de datos por parte de apis externas angular no actualiza la vista, por eso usamos Ngzone
    this.formNoticia = new FormGroup({
      titulo: new FormControl(''),
      contenido: new FormControl('')
    })
  }

  ngOnInit(): void {
    // todo ESTO DEBERÍA DE IR EN UN SERVICIO DE NOTICIAS
    this.http.get('http://localhost:3200/noticias')
      .subscribe((noticias: any) => {
        this.noticias = noticias
      })

      socket.on('nuevaNoticia', (nuevaNoticia) => {
        this.zone.run(() => { // metemos el push en las zonas de Angular para que actualize los datos, a pesar de que estos, vengan de una api externa. Dentro de aquí solo va lo que va a hacer que cambien los datos
          this.noticias.push(nuevaNoticia)
        })
      })

  }

  guardarNoticia(): void{
    const noticia = {...this.formNoticia.value}
    noticia.userId = this.authService.getUserIdFromToken()

    // todo ESTO DEBERÍA DE IR EN UN SERVICIO DE NOTICIAS
    this.http.post('http://localhost:3200/noticias', noticia)
      .subscribe((nuevaNoticia: any) => {
       console.log('La noticia se ha publicado correctamente')
      })
  }

}
