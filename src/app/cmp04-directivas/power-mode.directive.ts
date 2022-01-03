import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appPowerMode]'
})
export class PowerModeDirective{

  // @HostBinding('style.color') colorLetras: string = 'white' 
  // @HostBinding('style.top') top: string = '50%'
  // @HostBinding('style.right') right: string = '50%'

  constructor() { }

  //  getRandomColor() {
  //   let letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  // getRandomPorcentaje(){
  //   return Math.floor(Math.random() * 100) + "%";
  // }

  // @HostListener('input') input() { 
  //   this.colorLetras = this.getRandomColor()
  //   this.top = this.getRandomPorcentaje()
  //   this.right = this.getRandomPorcentaje()
  // }

  //Forma Ángel

  @HostBinding('style.color') color: string = 'black' 
  @HostBinding('style.top') top: string = '0px'
  @HostBinding('style.left') left: string = '0px'
  @HostBinding('style.position') position: string = 'absolute'

  colores: Array<string> = ['black', 'white', 'gray', 'yellow', 'red', 'blue', 'orange']

  @HostListener('input') onInput() {
    this.top = '5px'
    this.left = '5px'
    const pos = Math.floor(Math.random()*this.colores.length)
    this.color = this.colores[pos]
    setTimeout(() => {
      this.top = '0px'
      this.left = '0px'
    }, 300)
  }
}
