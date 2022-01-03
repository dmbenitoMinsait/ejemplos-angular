import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors} from '@angular/forms'
// FromGroup: tipo dato del formulario
// FormControl: tipo de dato de cada uno de los campos
// Validators: las validaciones
// FormBuilder: un servicio

import customValidators, { esUnStark } from '../custom-validators'; // Si estamos exportando una función en concreto
import MisValidators from '../custom-validators' // Si hemos usado un export default en la clase, podemos ponerle el nombre que queramos.
import { CustomValidators } from '../custom-validators'; // Si export con una constante indicando el nombre


@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.css']
})
export class ReactivoComponent implements OnInit {
  formulario: FormGroup

  // Este get es una propiedad de js/ts
  get erroresUsername(): ValidationErrors | null{
    return this.formulario.controls['username'].errors
  }

  get erroresEmail(): ValidationErrors | null{
    return this.formulario.controls['email'].errors
  }

  get erroresPassword(): ValidationErrors | null{
    return this.formulario.controls['password'].errors
  }

  get erroresConfirmarPassword(): ValidationErrors | null{
    return this.formulario.controls['confirmarPassword'].errors
  }

  // get inputConfirmarPassswordProps(): boolean{
  //   return this.formulario.controls['confirmarPassword'].dirty && this.formulario?.errors?.['confirmarPassword']
  // }

  constructor(private formBuilder: FormBuilder) { 
    // this.formulario = new FormGroup({
    //   username: new FormControl('', Validators.required), //Si solo añadimos un validator no haría falta pasarlo como array
    //   email: new FormControl('aaa@aaa.com', [Validators.required, Validators.pattern(/[a-z]+@[a-z]+\.(com|es|net)/) ]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(6)])
    // })

      // 2º Forma
    this.formulario = formBuilder.group({
      username: formBuilder.control('', [Validators.required, CustomValidators.esUnStark]), //Si solo añadimos un validator no haría falta pasarlo como array

      email: formBuilder.control('aaa@aaa.com', [Validators.required, Validators.pattern(/[a-z]+@[a-z]+\.(com|es|net)/) ]),

      password: formBuilder.control('123456M.', [Validators.required, Validators.minLength(6), CustomValidators.esPasswordSegura({mayus:true, simbolos: true})]),

      confirmarPassword: formBuilder.control('', CustomValidators.passwordRepetidaValida)
    },
    {
       // Esto último es opcional si queremos cambiar el uso del input. Con blur sería al perder el foco, submit al pulsar el botón...
      // updateOn: 'blur'
    })
  }

  ngOnInit(): void {
  }

  getPintaErrores(campo: string){
    return this.formulario.controls[campo].invalid && this.formulario.controls[campo].dirty
  }

  registro() {
    console.log(this.formulario.value)
  }

}
