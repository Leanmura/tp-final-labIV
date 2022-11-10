import { Especialidad } from "./especialidad";
import { Usuario } from "./usuario";

export class Especialista extends Usuario {
    especialidad: Especialidad[];
    activo: boolean;
    horarios: string[];
    constructor(
        uid: string = "",
        nombre: string = "",
        apellido: string = "",
        dni: number = 0,
        edad: number = 0,
        correo: String = "",
        img: string = "",
        clave: string = "",
        especialidad: Especialidad[] = [],
        activo: boolean = false,
        horarios: string[] = []) {
        super(uid, nombre, apellido, dni, edad, correo, img, clave, "Especialista");
        this.especialidad = especialidad;
        this.activo = activo;
        this.horarios = horarios;
    }
}
