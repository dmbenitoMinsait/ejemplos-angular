import { Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appMarcar]'
})
export class MarcarDirective implements OnInit{

  @HostBinding('style.background-color') colorfondo: string = 'white' //HostBinding enlaza el valor de la propiedad con el valor del parámetro

  @Input('appMarcar') color: string = '' //No cargaría aquí el color aunque pida que lo inicializemos

  constructor() { 
   }

  ngOnInit(): void {
    //El input va antes de inicializar la vista, es por ello que el color amarillo se lo asignamos después
    if (!this.color){
      this.color = 'yellow'
    }
  }

  @HostListener('mouseover') onMouseOver() { // El mouseover sería un evento de angular como podría ser el (click)
    this.colorfondo = this.color
  }

  @HostListener('mouseleave') onMouseLeave() { // El nombre de las funciones pueden ser cuales queramos
    this.colorfondo = 'white'
  }

}
