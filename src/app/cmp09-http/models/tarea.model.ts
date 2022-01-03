export class Tarea {
    constructor(
        public titulo: string, 
        public completada: boolean,
        public id?: string) {}
}

//Clase
// const tarea = new Tarea('Ver once piece', false)


// Si fuese interface
// const tarea:tarea = {
//     titulo: 'Ver OncePiece este finde',
//     completada: false,
//   }