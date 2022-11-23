export class Curso {

    public idcurso: number;
    public nombrecurso: string;
    public iddocente: number;
    public imagen: string;
    public file: any;
    public created_at: string;

    constructor(
        idcurso: number,
        nombrecurso: string,
        iddocente: number,
        imagen: string,
        file: any,
        created_at ?: string
    ){
        this.idcurso = idcurso;
        this.nombrecurso  = nombrecurso;
        this.iddocente = iddocente;
        this.imagen = imagen;
        this.file = file;
        this.created_at = created_at;
    }
}
