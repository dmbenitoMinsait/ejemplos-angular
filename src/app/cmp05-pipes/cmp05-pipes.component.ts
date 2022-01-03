import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cmp05-pipes',
  templateUrl: './cmp05-pipes.component.html',
  styleUrls: ['./cmp05-pipes.component.css']
})
export class Cmp05PipesComponent implements OnInit {

  producto: any = {
    titulo: 'one plus 9',
    descripcion: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus pariatur ad odio, omnis illo maiores fugit sequi. At, laboriosam? Obcaecati veritatis nulla nam asperiores, ullam libero dolorum recusandae vero dolor.',
    precio: 800,
    fechaLanzamiento: new Date(2021, 2, 13)
  }

  tareas: Array<string> = [
    'Tarea 1', 
    'Tarea 2',
    'Tarea 3'
  ]

  filtroTxt: string = ''

  // Fetch permite hacer peticiones dentro del navegador y devuelve promesas
  datosPost1 = fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(resp => {
    console.log(resp)
    return resp.json()
  })
  // .then(data => { // Ejemplo de que con el async como pipe en el html se esperaría hasta el último return que le pongamos
  //   console.log(data)
  //   return {}
  // })


    // Si lo escribimos en una sola línea no tendríamos que usar el return
  // datosPost1 = fetch('https://jsonplaceholder.typicode.com/posts/1')
  // .then(resp =>  resp.json())

  constructor() { }

  ngOnInit(): void {
    
    // console.log(new TitleCasePipe().transform(this.producto.titulo)) Para poder usarlo en el propio typeScript
  }

  addTarea(event: any): void{
    // this.tareas.push(event.target.value)
    this.tareas = [...this.tareas, event.target.value] //Lo ponemos así para que los pipes por defecto (pure: true) nos lo detecte al cambiar la dirección de memoria
    event.target.value = ''
  }

}
