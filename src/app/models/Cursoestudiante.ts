export class Cursoestudiante {

    public idcurso_estudiante: number;
    public idcurso: number;
    public idestudiante: number;
    public estado_aceptado: string;

    constructor(
        idcurso_estudiante: number,
        idcurso: number,
        idestudiante: number,
        estado_aceptado: string
    ) {
        this.idcurso_estudiante = idcurso_estudiante;
        this.idcurso = idcurso;
        this.idestudiante = idestudiante;
        this.estado_aceptado = estado_aceptado;
    }
}