import { Usuario } from "./usuario";

export class Paciente extends Usuario {
    img2: string;
    obraSocial: string;

    constructor(
        uid: string,
        nombre: string,
        apellido: string,
        dni: number,
        edad: number,
        correo: String,
        img: string,
        clave: string,
        img2: string,
        obraSocial: string) {
        super(uid, nombre, apellido, dni, edad, correo, img, clave, "Paciente");
        this.img2 = img2;
        this.obraSocial = obraSocial;
    }
}
