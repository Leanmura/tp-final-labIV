import { Especialidad } from "./especialidad";
import { Especialista } from "./especialista";
import { Paciente } from "./paciente";

export class Turno {
    id: string;
    horario: Date;
    estado: Estado;
    comentarioCancelado: string;
    resenia: string;
    comentarioAtencion: string;
    comentarioRechazado: string;
    paciente: Paciente;
    especialista: Especialista;
    especialidad: Especialidad;

    constructor(horario: Date, estado: Estado, comentarioCancelado: string, resenia: string, comentarioAtencion: string, paciente: Paciente, especialista: Especialista, especialidad: Especialidad, comentarioRechazado: string) {
        this.id = horario.toString() + ' ' + paciente.uid + ' ' + especialista.uid;
        this.horario = horario;
        this.estado = estado;
        this.comentarioCancelado = comentarioCancelado;
        this.resenia = resenia;
        this.comentarioAtencion = comentarioAtencion;
        this.paciente = paciente;
        this.especialista = especialista;
        this.especialidad = especialidad;
        this.comentarioRechazado = comentarioRechazado;
    }
}

export enum Estado {
    aceptado,
    realizado,
    cancelado,
    rechazado,
    espera
}