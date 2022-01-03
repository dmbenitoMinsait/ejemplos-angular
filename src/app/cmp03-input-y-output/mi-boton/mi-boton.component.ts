import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-mi-boton',
  templateUrl: './mi-boton.component.html',
  styleUrls: ['./mi-boton.component.css']
})
export class MiBotonComponent implements OnInit {

  @Input() texto: string = "";
  // @Input() texto!:string; Non null assertion operation. Esto es para que no de error por no estar inicializado
  
  @Output() pulsado = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(): void{
    this.pulsado.emit("Has pulsado sobre mi botón")
  }

}
