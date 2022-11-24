import { Paciente } from "./paciente";

export class Historial {
    paciente: Paciente;
    altura: number;
    peso: number;
    temperatura: number;
    presion: number;
    datosDinamicos: Array<any>;

    constructor(paciente: Paciente,
        altura: number,
        peso: number,
        temperatura: number,
        presion: number, datosDinamicos: Array<any> = []) {
        this.paciente = paciente;
        this.altura = altura;
        this.peso = peso;
        this.presion = presion;
        this.temperatura = temperatura;
        this.datosDinamicos = datosDinamicos;
    }
}
