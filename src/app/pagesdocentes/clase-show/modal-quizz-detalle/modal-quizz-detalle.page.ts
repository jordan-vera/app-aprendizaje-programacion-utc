import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Quizz } from 'src/app/models/Quizz';
import { Respuestaquizz } from 'src/app/models/Respuestaquizz';
import { QuizzService } from 'src/app/servicios/quizz.service';
import { RespuestaquizzService } from 'src/app/servicios/respuestaquizz.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-modal-quizz-detalle',
  templateUrl: './modal-quizz-detalle.page.html',
  styleUrls: ['./modal-quizz-detalle.page.scss'],
})
export class ModalQuizzDetallePage implements OnInit {
  @Input() idquizz = 0;

  public quizzOne: Quizz = new Quizz(0, '', 0, '');
  public respuestas: Respuestaquizz[] = [];
  public respuesta1: Respuestaquizz = new Respuestaquizz(0, '', false, 0);
  public respuesta2: Respuestaquizz = new Respuestaquizz(0, '', false, 0);
  public respuesta3: Respuestaquizz = new Respuestaquizz(0, '', false, 0);
  public respuesta4: Respuestaquizz = new Respuestaquizz(0, '', false, 0);

  constructor(
    private _quizzService: QuizzService,
    private _respuestaService: RespuestaquizzService,
    private toastController: ToastController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getQuizzOne();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  eliminar(): void {
    this._respuestaService.eliminarRespuestaQuizzAll(this.idquizz).subscribe(
      response => {
        this._quizzService.eliminarQuizzOne(this.idquizz).subscribe(
          response => {
            this.presentToast('top', 'Quizz eliminado!!');
            this.confirm();
          }, error => {
            console.log(error)
          }
        )
      }, error => {
        console.log(error)
      }
    )
  }

  actualizarTodo(): void {
    this.actualizar(this.quizzOne);
    this.actualizarRespuesta(this.respuesta1);
    this.actualizarRespuesta(this.respuesta2);
    this.actualizarRespuesta(this.respuesta3);
    this.actualizarRespuesta(this.respuesta4);

  }

  actualizar(dataQuizz: Quizz): void {
    dataQuizz.idquizz = +dataQuizz.idquizz;
    dataQuizz.idclase = +dataQuizz.idclase;
    this._quizzService.update(dataQuizz).subscribe(
      response => {
        this.presentToast('top', 'Respuesta actualizada!!');
      }, error => {
        console.log(error);
      }
    )
  }

  validarCorrecta(pregunta: number): void {
    if (pregunta == 1) {
      this.respuesta2.escorrecta = false;
      this.respuesta3.escorrecta = false;
      this.respuesta4.escorrecta = false;
    } else if (pregunta == 2) {
      this.respuesta1.escorrecta = false;
      this.respuesta3.escorrecta = false;
      this.respuesta4.escorrecta = false;
    } else if (pregunta == 3) {
      this.respuesta1.escorrecta = false;
      this.respuesta2.escorrecta = false;
      this.respuesta4.escorrecta = false;
    } else if (pregunta == 4) {
      this.respuesta1.escorrecta = false;
      this.respuesta2.escorrecta = false;
      this.respuesta3.escorrecta = false;
    }
  }

  actualizarRespuesta(respuestData: Respuestaquizz): void {
    console.log(respuestData);
    this._respuestaService.update(respuestData).subscribe(
      response => {
      }, error => {
        console.log(error);
      }
    )
  }

  getQuizzOne(): void {
    this._quizzService.getQuizzOne(this.idquizz).subscribe(
      response => {
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
        this.respuestas = response.response;
        this.respuesta1 = new Respuestaquizz(+this.respuestas[0].idrespuesta, this.respuestas[0].respuesta, +this.respuestas[0].escorrecta, this.respuestas[0].idquizz);
        this.respuesta2 = new Respuestaquizz(+this.respuestas[1].idrespuesta, this.respuestas[1].respuesta, +this.respuestas[1].escorrecta, this.respuestas[1].idquizz);
        this.respuesta3 = new Respuestaquizz(+this.respuestas[2].idrespuesta, this.respuestas[2].respuesta, +this.respuestas[2].escorrecta, this.respuestas[2].idquizz);
        this.respuesta4 = new Respuestaquizz(+this.respuestas[3].idrespuesta, this.respuestas[3].respuesta, +this.respuestas[3].escorrecta, this.respuestas[3].idquizz);
      }, error => {
        console.log(error);
      }
    )
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1500,
      position: position
    });
    await toast.present();
  }

}
