export class EstudianteProgramas {

    public idestudiante_programas: number;
    public idprograma: number;
    public idestudiante: number;
    public created_at: string;

    constructor(
        idestudiante_programas: number,
        idprograma: number,
        idestudiante: number,
        created_at: string
    ) {
        this.idestudiante_programas = idestudiante_programas;
        this.idprograma = idprograma;
        this.idestudiante = idestudiante;
        this.created_at = created_at;
    }
}