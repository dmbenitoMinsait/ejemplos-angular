import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ocultarDigitos'
})
export class OcultarDigitosPipe implements PipeTransform {

  transform(value: string): string {
    const ultimosNumeros = value.slice(-4) // le decimos que coja los 4 últimos
    const primerosNumeros = value.slice(0, -4)

    const numsOcultos = primerosNumeros.replace(/\d/g, '*') // (expresión regular)reemplazamos los números por *
    return numsOcultos + ultimosNumeros;
  }

}
