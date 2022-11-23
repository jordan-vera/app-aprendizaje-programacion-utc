export class Clases {

    public idclase: number;
    public nombreclase: string;
    public idcurso: number;
    public esactiva: boolean;
    public created_at: string;

    constructor(
        idclase: number,
        nombreclase: string,
        idcurso: number,
        esactiva: boolean,
        created_at ?: string
    ){
        this.idclase = idclase;
        this.nombreclase = nombreclase;
        this.idcurso = idcurso;
        this.esactiva = esactiva;
        this.created_at = created_at;
    }
}