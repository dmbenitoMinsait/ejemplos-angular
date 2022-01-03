import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-de-plantilla',
  templateUrl: './de-plantilla.component.html',
  styleUrls: ['./de-plantilla.component.css']
})
export class DePlantillaComponent implements OnInit {

  datosFormulario: any = {
    username: '',
    email: 'aaa@gmail.com',
    password: '123456'
  }

  constructor() { }

  ngOnInit(): void {
  }

  registro(form: NgForm){
    console.log(form)
    // console.log(form.value)
    // console.log(this.datosFormulario)
  }

}
