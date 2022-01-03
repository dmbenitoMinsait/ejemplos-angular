import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
  pure: true
  //pure: true -> es el valor por defecto. Para que solo se ejecute cuando hay algún cambio en los parámetros que recibe (con los push no se daría cuenta por ejemplo)
})
export class FiltroPipe implements PipeTransform {

  transform(value: Array<string>, filtro: string): Array<string> {
    console.log("Pasa por el pipe")
    return value.filter(item => item.includes(filtro))
  }

 
}
