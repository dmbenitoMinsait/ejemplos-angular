import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent implements OnInit {

  userId: string = ''
  userInfo$: Observable<any> | null = null
  usuario: any = {}

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {

    // this.router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
    //     const navigation = this.router.getCurrentNavigation();
    //     this.usuario = navigation?.extras?.state?.['usuario']
    //     this.userId = this.usuario.id
    //   });


    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.userId = params.get('id')!
        this.userInfo$ = this.http.get(`http://localhost:3000/users/${this.userId}`)
        // Para cuando solo necesitamos pintar los datos y no acceder a ellos podemos usar esta forma para no tener que hacer la suscripción y guardarlo en otro objeto
      }
    })
  }

}
