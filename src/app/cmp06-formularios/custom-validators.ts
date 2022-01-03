import { AbstractControl, ControlContainer, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

interface IOpcionesPassword {
    mayus?: boolean,
    simbolos?: boolean
}

// Para que no de error los Validators tenemos que devolver un ValidatorFn
function contraseñaSegura(opciones: IOpcionesPassword): ValidatorFn {

    //Aquí devolveríamos un ValidationErrors
    return (control) => {
        let hayMayusculas: boolean = false
        let haySimbolos: boolean = false
        if (opciones.mayus) {
            hayMayusculas = control.value.toLowerCase() != control.value
        }

        if (opciones.simbolos) {
            //estamos creando una expresión regular en la que pedimos que mínimo haya un símbolo y lo estamos comprobando con el .test
            haySimbolos = new RegExp('\\W+').test(control.value)

            // otra forma de poner la expresión regular:
            // haySimbolos = /\W+/.test(control.value) 
        }

        const objError = {
            esPwSegura: {
                simbolos: haySimbolos,
                mayus: hayMayusculas
            }
        }

        return hayMayusculas && haySimbolos ? null : objError
    }
}

/**
 * Cuando devuelve un null es que la validación ha ido bien, cuando devuelve un objeto es que algo ha fallado
 * @param control 
 * @returns 
 */
export function esUnStark(control: AbstractControl): ValidationErrors | null {
    const nombresStark = ['robb', 'arya', 'tody', 'sansa', 'rickon', 'bran', 'nedd']
    if (nombresStark.includes(control.value.toLowerCase())) {
        return null
    }
    return {
        esStark: {
            nombresValidos: nombresStark,
            nombreActual: control.value
        }
    }
}

// function passwordRepetidaValida(formGroup: AbstractControl): ValidationErrors | null {
//     const { password, confirmarPassword} = formGroup.value
//     if (password == confirmarPassword) {
//         return null
//     }
//     return {
//         confirmarPassword: true
//     }
// }

function passwordRepetidaValida(control: AbstractControl): ValidationErrors | null {
    // con el parent accederíamos al padre del control, que sería el formulario
    const formulario = control.parent
    const password = formulario?.value.password

    const confirmarPassword = control.value

    if (password == confirmarPassword) {
        return null
    }
    return {
        confirmarPassword: true
    }

}



// Esta sería otra forma de crear las funciones
// const nombreFuncion = () => {

// }

/**
 * Podemos meter todos los métodos que necesitemos que se exporten por defecto
 */
export default {
    esUnStark
}

export const CustomValidators = {
    esUnStark,
    esPasswordSegura: contraseñaSegura, //podemos cambiarle el nombre 
    passwordRepetidaValida
}