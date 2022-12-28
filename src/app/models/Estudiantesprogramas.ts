export class EstudianteProgramas {

    public idestudiante_programas: number;
    public idprograma: number;
    public created_at: string;

    constructor(
        idestudiante_programas: number,
        idprograma: number,
        created_at: string
    ) {
        this.idestudiante_programas = idestudiante_programas;
        this.idprograma = idprograma;
        this.created_at = created_at;
    }
}