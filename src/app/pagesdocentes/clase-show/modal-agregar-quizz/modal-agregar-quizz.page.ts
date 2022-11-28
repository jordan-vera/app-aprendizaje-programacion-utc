import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Quizz } from 'src/app/models/Quizz';
import { Respuestaquizz } from 'src/app/models/Respuestaquizz';
import { QuizzService } from 'src/app/servicios/quizz.service';
import { RespuestaquizzService } from 'src/app/servicios/respuestaquizz.service';

@Component({
  selector: 'app-modal-agregar-quizz',
  templateUrl: './modal-agregar-quizz.page.html',
  styleUrls: ['./modal-agregar-quizz.page.scss'],
})
export class ModalAgregarQuizzPage implements OnInit {
  @Input() idclase = 0;
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  public respuesta1: Respuestaquizz = new Respuestaquizz(0, '', false, 0);
  public respuesta2: Respuestaquizz = new Respuestaquizz(0, '', false, 0);
  public respuesta3: Respuestaquizz = new Respuestaquizz(0, '', false, 0);
  public respuesta4: Respuestaquizz = new Respuestaquizz(0, '', false, 0);
  public respuestas: Respuestaquizz[] = [];

  public quizz: Quizz = new Quizz(0, '', 0, '');

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private _quizzService: QuizzService,
    private _respuestaQuizzService: RespuestaquizzService
  ) { }

  ngOnInit() {
  }

  guardarQuizz(): void {
    this.quizz.idclase = this.idclase;
    this._quizzService.create(this.quizz).subscribe(
      response => {
        var idquizz = response.response;
        this.guardarRespuesta(this.respuesta1, false, idquizz);
        this.guardarRespuesta(this.respuesta2, false, idquizz);
        this.guardarRespuesta(this.respuesta3, false, idquizz);
        this.guardarRespuesta(this.respuesta4, true, idquizz);
      }, error => {
        console.log(error);
      }
    )
  }

  guardarRespuesta(data: Respuestaquizz, alerta: boolean, idquizz: number): void {
    data.idquizz = idquizz;
    this._respuestaQuizzService.create(data).subscribe(
      response => {
        if (alerta == true) {
          this.presentToast('top', 'Programa guardado corectamente!!')
          this.confirm();
          this.limpiar();
        }
      }, error => {
        console.log(error);
      }
    )
  }

  limpiar(): void {
    this.quizz = new Quizz(0, '', 0, '');
    this.respuesta1 = new Respuestaquizz(0, '', false, 0);
    this.respuesta2 = new Respuestaquizz(0, '', false, 0);
    this.respuesta3 = new Respuestaquizz(0, '', false, 0);
    this.respuesta4 = new Respuestaquizz(0, '', false, 0);
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

  ionViewDidEnter() {
    this.editorOptions = { theme: 'vs-dark', language: 'javascript' };
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
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
