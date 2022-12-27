export class Usuario {

    public idusuario: number;
    public nick: string;
    public clave: string;
    public tipo: string;

    constructor(
        idusuario: number,
        nick: string,
        clave: string,
        tipo: string,
    ){
        this.idusuario = idusuario;
        this.nick = nick;
        this.clave = clave;
        this.tipo = tipo;
    }
}