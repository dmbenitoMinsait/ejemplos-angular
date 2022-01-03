import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EventosService {
  authEvent$ = new EventEmitter<boolean>() //en $ acaban los observables como buena práctica

  constructor() { }
}
