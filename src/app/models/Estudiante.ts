export class Estudiante {

    public idestudiante: number;
    public nombres: string;
    public identificacion: string;
    public email: string;
    public idusuario: number;

    constructor(
        idestudiante: number,
        nombres: string,
        identificacion: string,
        email: string,
        idusuario: number
    ) {
        this.idestudiante = idestudiante;
        this.nombres = nombres;
        this.identificacion = identificacion;
        this.email = email;
        this.idusuario = idusuario;
    }
}