import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter, from, fromEvent, map, Observable, Subscriber, take } from 'rxjs';

@Component({
  selector: 'app-cmp08-observables',
  templateUrl: './cmp08-observables.component.html',
  styleUrls: ['./cmp08-observables.component.css']
})
export class Cmp08ObservablesComponent implements OnInit {

  mostrarHora: boolean = false
  @ViewChild('btnMostrar') boton!: ElementRef
  constructor() { }

  ngOnInit(): void {
    //Creando nuestro propio Observable
    const miObservable = new Observable((subscriber: Subscriber<string>) => {
      subscriber.next('Mensaje 1')
      setTimeout(() => {
        subscriber.next('Mensaje 2')
      }, 3000)

      // setTimeout(() => {
      //   subscriber.error('Un error')
      // }, 6000)

      //El complete no devuelve nada
      setTimeout(() => {
        subscriber.complete()
      }, 6000)
    })

    // Si no queremos comprobar los errores, ni el complete se podría hacer así más rápido
    // miObservable.subscribe((msg: string) => {
    //   console.log(msg)
    // })

    // miObservable.subscribe({
    //   next: (msg:string) => {
    //     console.log(msg)
    //   },
    //   error: (err) => { //Si hay un error ya no se ejecuta nada más del observable, se desuscribe
    //     console.log(err)
    //   },
    //   complete: () => { //No tiene constructor porque no devuelve nada
    //     console.log('Ya no vamos a enviar más mensajes')
    //   } 
    // })
    
   
  }

  ngAfterViewInit() {
    // fromEvent(this.boton.nativeElement, 'click')
    // .subscribe((event) => {
    //   alert('Has pulsado el botón')
    // })

    // fromEvent(document, 'mousemove')
    // .subscribe((event) => {
    //   console.log('Estás moviendo el ratón')
    // })

    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe( // Lo usamos sobre los observables (hay bastantes más)
        filter((event: MouseEvent) => {
          // console.log(event)
          const { clientX, clientY } = event
          return clientX > 400 && clientY < 300
        }),
        map((event: any) => {
          return { x: event.clientX, y: event.clientY }
        }),
        // take(10) // Para limitarle las veces
      )
      .subscribe((event: IPosicionRaton) => {
          console.log('Estás moviendo el ratón en la posición ' + event.x + "x " + event.y + "y")
        })


        // Nos devuelve los números por separado
        from([1, 2, 3])
          .pipe(
            map(n => n*2)
          )
          .subscribe(n => console.log(n))
  }


  

  toggleMostrarHora(){
    this.mostrarHora = !this.mostrarHora
  }

}


interface IPosicionRaton{
  x: number,
  y: number
}
