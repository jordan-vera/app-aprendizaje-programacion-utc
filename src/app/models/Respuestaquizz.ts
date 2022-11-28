export class Respuestaquizz {

    public idrespuesta: number;
    public respuesta: string;
    public escorrecta: boolean;
    public idquizz: number;

    constructor(
        idrespuesta: number,
        respuesta: string,
        escorrecta: boolean,
        idquizz: number
    ){
        this.idrespuesta = idrespuesta;
        this.respuesta = respuesta;
        this.escorrecta = escorrecta;
        this.idquizz = idquizz;
    }
}