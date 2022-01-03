import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ocultarPalabras'
})
export class OcultarPalabrasPipe implements PipeTransform {

  transform(value: string, baneadas: Array<string>): string {
    // for (let ban of baneadas) {
    //   value = value.toLocaleLowerCase().replaceAll(ban, '*'.repeat(ban.length))
    // }
    // return value

    //Forma de Ángel

      // Solución 1
    // baneadas.forEach((baneada) => {
    //   const regExp = new RegExp(baneada, 'gi') //g: hace el replace all e i: hace que no importen mayúsculas o minúsculas
    //   value = value.replace(regExp, '*'.repeat(baneada.length))
    // });

    // una vez creado el regExp con .test(expresión) nos devolverá un booleano confirmando si cumple la expresión 

    // Solución 2
    baneadas.forEach((baneada) => {
      value = value.toLocaleLowerCase().replaceAll(baneada, '*'.repeat(baneada.length))
    });

     
    return value
  }
}


