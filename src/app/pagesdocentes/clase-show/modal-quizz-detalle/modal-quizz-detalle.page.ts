import { Component, Input, OnInit } from '@angular/core';
import { Quizz } from 'src/app/models/Quizz';
import { Respuestaquizz } from 'src/app/models/Respuestaquizz';
import { QuizzService } from 'src/app/servicios/quizz.service';
import { RespuestaquizzService } from 'src/app/servicios/respuestaquizz.service';

@Component({
  selector: 'app-modal-quizz-detalle',
  templateUrl: './modal-quizz-detalle.page.html',
  styleUrls: ['./modal-quizz-detalle.page.scss'],
})
export class ModalQuizzDetallePage implements OnInit {
  @Input() idquizz = 0;

  public quizzOne: Quizz = new Quizz(0, '', 0, '');
  public respuestas: Respuestaquizz[] = [];

  constructor(
    private _quizzService: QuizzService,
    private _respuestaService: RespuestaquizzService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getQuizzOne();
  }

  getQuizzOne(): void {
    this._quizzService.getQuizzOne(this.idquizz).subscribe(
      response => {
        console.log(response)
        this.quizzOne = response.response;
        this.getRespuestas();
      }, error => {
        console.log(error);
      }
    )
  }

  getRespuestas(): void {
    this._respuestaService.getrespuestaquizzAll(this.idquizz).subscribe(
      response => {
        console.log(response)
        this.respuestas = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

}
