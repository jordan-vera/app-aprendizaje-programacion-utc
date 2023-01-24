export class Estudianterespuestapuzzle {

    public idestudianterespuesta_puzzle: number;
    public idestudiante: number;
    public idpuzzle: number;
    public imagenrespuesta: string;
    public tiempo_usado: string;
    public puntaje: number;
    public created_at: string;

    constructor(
        idestudianterespuesta_puzzle: number,
        idestudiante: number,
        idpuzzle: number,
        imagenrespuesta: string,
        tiempo_usado: string,
        puntaje: number,
        created_at: string,
    ){
        this.idestudianterespuesta_puzzle = idestudianterespuesta_puzzle;
        this.idestudiante = idestudiante;
        this.idpuzzle = idpuzzle;
        this.imagenrespuesta = imagenrespuesta;
        this.tiempo_usado = tiempo_usado;
        this.puntaje = puntaje;
        this.created_at = created_at;
    }
}