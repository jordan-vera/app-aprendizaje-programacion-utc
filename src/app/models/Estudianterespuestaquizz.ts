export class Estudianterespuestaquizz {

    public idrespuestaseleccionada_quizz: number;
    public idestudiante_quizz: number;
    public idrespuestaquizz: number;
    public created_at: string;

    constructor(
        idrespuestaseleccionada_quizz: number,
        idestudiante_quizz: number,
        idrespuestaquizz: number,
        created_at: string
    ){
        this.idrespuestaseleccionada_quizz = idrespuestaseleccionada_quizz;
        this.idestudiante_quizz = idestudiante_quizz;
        this.idrespuestaquizz = idrespuestaquizz;
        this.created_at = created_at;
    }
}