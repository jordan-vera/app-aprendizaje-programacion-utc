export class Codigo {

    public idcodigo: number;
    public fragmentocodigo: string;
    public respuestacorrecta: boolean;
    public idprograma: number;
    public created_at: string;

    constructor(
        idcodigo: number,
        fragmentocodigo: string,
        respuestacorrecta: boolean,
        idprograma: number,
        created_at: string
    ){
        this.idcodigo = idcodigo;
        this.fragmentocodigo = fragmentocodigo;
        this.respuestacorrecta = respuestacorrecta;
        this.idprograma = idprograma;
        this.created_at = created_at;
    }
}