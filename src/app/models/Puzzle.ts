export class Puzzle {

    public idpuzzle: number;
    public titulo: string;
    public imagen: string;
    public tiempo_estimado: string;
    public idclase: number;
    public created_at: string;
    public file: any;

    constructor(
        idpuzzle: number,
        titulo: string,
        imagen: string,
        tiempo_estimado: string,
        idclase: number,
        created_at: string,
        file: any
    ) {
        this.idpuzzle = idpuzzle;
        this.titulo = titulo;
        this.imagen = imagen;
        this.tiempo_estimado = tiempo_estimado;
        this.idclase = idclase;
        this.created_at = created_at;
        this.file = file;
    }
}