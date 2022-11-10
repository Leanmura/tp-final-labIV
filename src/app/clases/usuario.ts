export class Usuario {
    uid: string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    correo: String;
    clave: string;
    img: string;
    perfil: string


    constructor(
        uid: string = "",
        nombre: string = "",
        apellido: string = "",
        dni: number = 0,
        edad: number = 0,
        correo: String = "",
        img: string = "",
        clave: string = "",
        perfil: string = "") {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.correo = correo;
        this.img = img;
        this.dni = dni;
        this.clave = clave;
        this.perfil = perfil;
        this.uid = uid;
    }
}
