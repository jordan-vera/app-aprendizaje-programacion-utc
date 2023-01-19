import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuizzService } from 'src/app/servicios/quizz.service';
import { RespuestaquizzService } from 'src/app/servicios/respuestaquizz.service';

@Component({
  selector: 'app-modal-resolucion-quizz',
  templateUrl: './modal-resolucion-quizz.page.html',
  styleUrls: ['./modal-resolucion-quizz.page.scss'],
})
export class ModalResolucionQuizzPage implements OnInit {
  @Input() idclase: number;

  public respuestasQuizz: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private _quizzService: QuizzService
  ) { }

  ngOnInit() {
    this.getQuizzList();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getQuizzList(): void {
    this._quizzService.getquizzRespuesta(this.idclase).subscribe(
      response => {
        var respuestastemporales = [];
        var norespondidas = response.norespondidas;
        var respuesta = response.respuestaquizz;

        for (let i = 0; i < norespondidas.length; i++) {
          respuestastemporales = []
          for (let j = 0; j < respuesta.length; j++) {
            if (respuesta[j].idquizz == norespondidas[i].idquizz) {
              respuestastemporales.push(respuesta[j]);
            }
          }
          this.respuestasQuizz.push(
            {
              "idquizz": norespondidas[i].idquizz,
              "titulo": norespondidas[i].titulo,
              "idclase": norespondidas[i].idclase,
              "created_at": norespondidas[i].created_at,
              "respuestas": respuestastemporales
            }
          )
        }
        console.log(this.respuestasQuizz)
      }, error => {
        console.log(error);
      }
    )
  }

}
