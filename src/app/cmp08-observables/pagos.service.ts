import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor() { }

  pagarSuscripcion(): boolean{
    const num = Math.floor(Math.random() * 11)
    return [1,2,3,4,5,7,9,10].includes(num)
  }
}
