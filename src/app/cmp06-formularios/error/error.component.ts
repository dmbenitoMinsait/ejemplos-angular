import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnChanges {

  @Input() errores: ValidationErrors | null = {}
  mensajesErrores: Array<string> = []

  constructor() { }

  //Cuando alguna variable cambie de valor se ejecuta
  ngOnChanges(): void {
    // console.log(this.errores)
    this.mensajesErrores = []

    for (let key in this.errores) {
      console.log(key)
      const error = this.errores[key]

      if (key == 'required') {
        this.mensajesErrores.push('El campo es obligatorio')

      } else if (key == 'minlength') {
        const msg = `Te faltan ${error.requiredLength - error.actualLength}/${error.requiredLength} caracteres`
        this.mensajesErrores.push(msg)

      } else if (key == 'pattern') {
        const msg = `El ${error.actualValue} no cumple con el siguiente patrón: ${error.requiredPattern}`
        this.mensajesErrores.push(msg)

      } else if (key == 'esStark') {
        const msg = `${error.nombreActual} no es un Stark (${error.nombresValidos.join(', ')})`
        this.mensajesErrores.push(msg)

      } else if (key == 'esPwSegura') {
        if (!error.simbolos) {
          this.mensajesErrores.push('La contraseña tiene que tener algún signo de puntuación')
        } 
        if (!error.mayus) {
          this.mensajesErrores.push('La contraseña tiene que tener alguna letra en mayúsculas')
        }
        
      }else if (key == 'confirmarPassword') {
        this.mensajesErrores.push('Las contraseñas tienen que ser iguales')
      }
    }
  }

  ngOnInit(): void {

  }

}
