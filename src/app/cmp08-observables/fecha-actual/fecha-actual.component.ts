import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-fecha-actual',
  templateUrl: './fecha-actual.component.html',
  styleUrls: ['./fecha-actual.component.css']
})
export class FechaActualComponent implements OnInit, OnDestroy {

  fecha: Date = new Date()
  suscripcion: Subscription | null = null
  suscripcion1: Subscription | null = null
  obsIntervalNums: Observable<number> = interval(2000)

  constructor() { }
 

  ngOnInit(): void {

    this.suscripcion1 = interval(3000).subscribe(() => console.log('Estás suscrito'))

    const observableFecha: Observable<number> = interval(1000)
    this.suscripcion = observableFecha.subscribe((n: number) => {
        console.log(n)
        this.fecha = new Date()
      })
  }

  desubscribirInterval1(){
    this.suscripcion1?.unsubscribe()
  }


  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe()
  }



}
