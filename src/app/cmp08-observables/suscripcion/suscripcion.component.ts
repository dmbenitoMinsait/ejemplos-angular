import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { interval, Observable, Subscriber, Subscription } from 'rxjs';
import { PagosService } from '../pagos.service';

@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit {

  @Input() plataforma: string = ''
  @Input() precio: number = 4.95
  subEstado: boolean = false
  fechaProximoPago: Date = new Date()
  suscripcionPlataforma: Subscription | null = null
  cancelarSubs$ = new EventEmitter<boolean>()
  
  alert: any = {
    danger: false,
    info: false,
    success: false,
    mensaje: '',
    mostrar: false
  }

  constructor(private pagosService: PagosService) { }

  ngOnInit(): void {
  }

  showAlert(mensaje: string, tipo: string): void {
    this.alert.danger = tipo == 'danger'
    this.alert.info = tipo == 'info'
    this.alert.success = tipo == 'success'
    this.alert.mensaje = mensaje
    this.alert.mostrar = true
    setTimeout(() => {
      this.alert.mostrar = false
    }, 1500)
    
  }

  getFechaProximoPago(): Date {
    const fecha: Date = new Date()
    fecha.setSeconds(fecha.getSeconds() + 2)
    this.fechaProximoPago = fecha
    return fecha
  }

  activarSuscripcion() {
    const observableSub = new Observable((subscriber: Subscriber<any>) => {
      this.subEstado = true

      this.fechaProximoPago = this.getFechaProximoPago()

      const subscriptionInterval = interval(2000).subscribe(() => {
        if (this.pagosService.pagarSuscripcion()) {
          subscriber.next('Te hemos cobrado ' + this.precio)
          this.fechaProximoPago = this.getFechaProximoPago()
        } else {
          this.subEstado = false
          subscriber.error('No te hemos podido cobrar la suscripción. Revisa el método de pago y vuelve a suscribirte.')
          subscriptionInterval?.unsubscribe()
        }
      })

      //Solo se llamaría cuando cancelarSubs se llame, es decir, al pulsar el botón de cancelar suscripción
     const subscripcionCancelar =  this.cancelarSubs$.subscribe(() => {
        this.subEstado = false
        subscriptionInterval.unsubscribe()
        subscriber.complete()
        subscripcionCancelar.unsubscribe()
      })

        // 2º Forma con el setInterval
      // const intervalID = setInterval(() => {
      //   if (this.pagosService.pagarSuscripcion()) {
      //     subscriber.next('Te hemos cobrado ' + this.precio)
      //     this.fechaProximoPago = this.getFechaProximoPago()
      //   } else {
      //     this.subEstado = false
      //     subscriber.error('No te hemos podido cobrar la suscripción. Revisa el método de pago y vuelve a suscribirte.')
      //     clearInterval(intervalID) // Para que no se siga ejecutando cuando falla el pago
      //   }
      // }, 2000)


    })

    this.suscripcionPlataforma = observableSub.subscribe({
      next: (msg: string) => this.showAlert(msg, 'success'),
      error: (err: string) => this.showAlert(err, 'danger'),
      complete: () => this.showAlert('Has cancelado la suscripción :( Te echaremos de menos', 'info'),
    })
  }

  cancelarSuscripcion() {
    this.cancelarSubs$.emit(true)
  }

}
