import { Tarea } from "../models/tarea.model";

export interface IIdNuevaTarea {
    name: string
}

export interface IObjetosTarea {
    [key: string]: Tarea // lo ponemos entre claves para indicarle que puede ser un String dinámico

}