export class RespuestaCodigo {

    public idrespuestacodigo: number;
    public idcodigo: number;
    public idestudiante_programas: number;
    public created_at: string;

    constructor(
        idrespuestacodigo: number,
        idcodigo: number,
        idestudiante_programas: number,
        created_at: string
    ) {
        this.idrespuestacodigo = idrespuestacodigo;
        this.idcodigo = idcodigo;
        this.idestudiante_programas = idestudiante_programas;
        this.created_at = created_at;
    }
}