import { Usuario } from "./usuario";

export class Admin extends Usuario {

    constructor(
        uid: string,
        nombre: string,
        apellido: string,
        dni: number,
        edad: number,
        correo: String,
        img: string,
        clave: string) {
        super(uid, nombre, apellido, dni, edad, correo, img, clave, "Admin");
    }
}
