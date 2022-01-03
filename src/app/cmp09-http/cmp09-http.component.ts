import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IIdNuevaTarea } from './interfaces'; //como lo hemos llamado index al archivo, solo se importa ese (porque se supone que están ya todos juntos)
import { Tarea } from './models/tarea.model';
import { TareasService } from './services/tareas.service';

@Component({
  selector: 'app-cmp09-http',
  templateUrl: './cmp09-http.component.html',
  styleUrls: ['./cmp09-http.component.css']
})
export class Cmp09HttpComponent implements OnInit {
  listaTareas: Array<Tarea> = []
  formEditar: FormGroup;

  constructor(private tareasService: TareasService) { 
    this.formEditar = new FormGroup({
      id: new FormControl('', Validators.required),
      titulo: new FormControl('', Validators.required),
      completada: new FormControl(false),
    })
   }

  ngOnInit(): void {
   this.getTareas()
  }

  actualizar(): void{
    console.log(this.formEditar)
    const idTareaEditada = this.formEditar.value.id
    this.tareasService.updateTarea(this.formEditar.value)
      .subscribe((datosActualizados: Tarea) => {
        console.log('Actualizado')
        console.log(idTareaEditada)

        // SOLUCIÓN 1
        let tarea = this.listaTareas.find(t => t.id == idTareaEditada)
        Object.assign(tarea, datosActualizados)

      })
  }

  rellenarFormulario(t: Tarea){
    // SOLUCIÓN 1
    // this.formEditar.controls['id'].setValue(t.id)
    // this.formEditar.controls['titulo'].setValue(t.titulo)
    // this.formEditar.controls['completada'].setValue(t.completada)

    // SOLUCIÓN 2 (sería obligatorio poner todos los campos con esta solución)
    // this.formEditar.setValue({
    //   id: t.id,
    //   titulo: t.titulo,
    //   completada: t.completada
    // })

   // SOLUCIÓN 3
    this.formEditar.setValue({...t})
  }

  getTareas(){
    this.tareasService.getTareas()
    .subscribe((tareas: Array<Tarea>) => {
      this.listaTareas = tareas
    })
  }

  /**
   * Para añadir los datos
   */
  guardar() {
    // const tarea = {
    //   titulo: 'Ver OncePiece este finde',
    //   completada: false,
    // }

     const tarea = new Tarea('Ver once piece', false)

    // Este sería el 'Post'
    this.tareasService.createTareas(tarea)
      .subscribe((datos: IIdNuevaTarea) => {
        console.log(datos)
        // tarea.id = datos.name
        // this.listaTareas.push(tarea)
        this.getTareas()
      })
  }

  completar(tarea: Tarea){
    this.tareasService.completeTarea(tarea)
      .subscribe((datos) => {
        tarea.completada = datos.completada
      })
  }

  eliminar(id: string): void{
    this.tareasService.deleteTarea(id)
      .subscribe(() => {
        // Opciones para eliminar la tarea del array

          // 1) Filter
        // this.listaTareas = this.listaTareas.filter((t: Tarea) => {
        //   return t.id =! id
        // })

          // 2) findIndex y Splice
        const pos = this.listaTareas.findIndex((t: Tarea) => t.id == id)
        this.listaTareas.splice(pos, 1)
      })
  }

}
