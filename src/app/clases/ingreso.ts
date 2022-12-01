export class Ingreso {
    id: string;
    usuario: string;
    log: Date;

    constructor(
        id: string = "",
        usuario: string = '',
        log: Date) {
        this.id = id + log;
        this.usuario = usuario;
        this.log = log;

    }
}
