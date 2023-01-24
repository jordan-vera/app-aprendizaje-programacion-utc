export class Estudiantequizz {

    public idestudiante_quizz: number;
    public idestudiante: number;
    public idquizz: number;
    public created_at: string;

    constructor(
        idestudiante_quizz: number,
        idestudiante: number,
        idquizz: number,
        created_at: string
    ){
        this.idestudiante_quizz = idestudiante_quizz;
        this.idestudiante = idestudiante;
        this.idquizz = idquizz;
        this.created_at = created_at;
    }
}