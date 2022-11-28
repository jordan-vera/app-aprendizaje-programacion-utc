export class Quizz {

    public idquizz: number;
    public titulo: string;
    public idclase: number;
    public created_at: string;

    constructor(
        idquizz: number,
        titulo: string,
        idclase: number,
        created_at: string
    ){
        this.idquizz = idquizz;
        this.titulo = titulo;
        this.idclase = idclase;
        this.created_at = created_at;
    }
}