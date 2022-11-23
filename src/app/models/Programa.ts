export class Programa {

    public idprograma: number;
    public titulo: string;
    public idclase: number;
    public created_at: string;

    constructor(
        idprograma: number,
        titulo: string,
        idclase: number,
        created_at: string
    ) {
        this.idprograma = idprograma;
        this.titulo = titulo;
        this.idclase = idclase;
        this.created_at = created_at;
    }
}