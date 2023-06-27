import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Estudiantequizz } from 'src/app/models/Estudiantequizz';
import { Estudianterespuestaquizz } from 'src/app/models/Estudianterespuestaquizz';
import { EstudianteQuizzService } from 'src/app/servicios/estudiantequizz.service';
import { EstudianteRespuestaQuizzService } from 'src/app/servicios/estudianterespuestaquizz.service';
import { QuizzService } from 'src/app/servicios/quizz.service';

@Component({
  selector: 'app-modal-resolucion-quizz',
  templateUrl: './modal-resolucion-quizz.page.html',
  styleUrls: ['./modal-resolucion-quizz.page.scss'],
})
export class ModalResolucionQuizzPage implements OnInit {
  @Input() idclase: number;
  @Input() idestudiante: number;

  public respuestasQuizz: any[] = [];
  public procesoRespuesta: any[] = [];
  public estudiantequizz: Estudiantequizz = new Estudiantequizz(0, 0, 0, '');
  public estudianterespuestaquizz: Estudianterespuestaquizz = new Estudianterespuestaquizz(0, 0, 0, '');
  public contador: number = 1;

  constructor(
    private modalCtrl: ModalController,
    private _quizzService: QuizzService,
    private toastController: ToastController,
    private _estudiantequizzService: EstudianteQuizzService,
    private _estudianterespuestaquizzService: EstudianteRespuestaQuizzService
  ) { }

  ngOnInit() {
    this.getQuizzList();
    var intervalo = setInterval(()=>{
      this.contador ++;
      if(this.contador == 4){
        clearInterval(intervalo);
      }
    },1400)
  }

  guardarRespuestas(): void {
    console.log(this.procesoRespuesta)
    if (this.procesoRespuesta.length == this.respuestasQuizz.length) {
      for (let x = 0; x < this.procesoRespuesta.length; x++) {
        this.guardarEstudianteQuizz(this.procesoRespuesta[x].idquizz, this.procesoRespuesta[x].idrespuesta, x + 1);
      }
    } else {
      this.presentToast('top', 'Tiene que responder todas las preguntas');
    }
  }

  guardarEstudianteQuizz(idquizz: number, idrespuestaquizz: number, indice: number): void {
    this.estudiantequizz.idestudiante = this.idestudiante;
    this.estudiantequizz.idquizz = idquizz;
    this._estudiantequizzService.create(this.estudiantequizz).subscribe(
      response => {
        this.guardarRespuestasSeleccionada(response.response, idrespuestaquizz)
        if (indice == this.procesoRespuesta.length) {
          this.presentToast('top', 'Proceso finalizado con exito');
          setTimeout(() => {
            this.cancel();
          }, 1000);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  guardarRespuestasSeleccionada(idestudiantequizz, idrespuestaquizz) {
    this.estudianterespuestaquizz.idestudiante_quizz = idestudiantequizz;
    this.estudianterespuestaquizz.idrespuestaquizz = idrespuestaquizz;
    this._estudianterespuestaquizzService.create(this.estudianterespuestaquizz).subscribe(
      response => {

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

  seleccionarRespuesta(idrespuesta, idquizz): void {
    for (let i = 0; i < this.respuestasQuizz.length; i++) {
      if (this.respuestasQuizz[i].idquizz == idquizz) {
        for (let j = 0; j < this.respuestasQuizz[i].respuestas.length; j++) {
          if (this.respuestasQuizz[i].respuestas[j].idrespuesta != idrespuesta) {
            var checkBox = document.getElementById(this.respuestasQuizz[i].respuestas[j].idrespuesta) as HTMLInputElement;
            checkBox.checked = false;
          } else {
            if (this.procesoRespuesta.length > 0) {
              var cont = this.procesoRespuesta.length;
              var repetidoEncontrado = 'false';
              for (let x = 0; x < cont; x++) {
                if (this.procesoRespuesta[x].idrespuesta == idrespuesta) {
                  this.procesoRespuesta = this.procesoRespuesta.filter((item) => item.idrespuesta !== this.procesoRespuesta[x].idrespuesta)
                  this.procesoRespuesta.push({ "idrespuesta": idrespuesta, "idquizz": idquizz });
                  repetidoEncontrado = 'true';
                }
              }
              if (repetidoEncontrado == 'false') {
                this.procesoRespuesta.push({ "idrespuesta": idrespuesta, "idquizz": idquizz })
              }
            } else {
              this.procesoRespuesta.push({ "idrespuesta": idrespuesta, "idquizz": idquizz })
            }
          }
        }
      }
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getQuizzList(): void {
    this._quizzService.getquizzRespuesta(this.idclase, this.idestudiante).subscribe(
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
