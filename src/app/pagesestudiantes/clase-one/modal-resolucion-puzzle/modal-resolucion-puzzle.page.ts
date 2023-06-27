import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Puzzle } from 'src/app/models/Puzzle';
import { PuzzleService } from 'src/app/servicios/puzzle.service';
import { Global } from 'src/app/servicios/url';
import { puzzle } from 'jigsaw-puzzle'
import { Estudianterespuestapuzzle } from 'src/app/models/Estudianterespuestapuzzle';
import { EstudianteRespuestaPuzzleService } from 'src/app/servicios/estudianterespuestapuzzle.service';

@Component({
  selector: 'app-modal-resolucion-puzzle',
  templateUrl: './modal-resolucion-puzzle.page.html',
  styleUrls: ['./modal-resolucion-puzzle.page.scss'],
})
export class ModalResolucionPuzzlePage implements OnInit {
  @Input() idpuzzle: number;
  @Input() idestudiante: number;
  public puzzle: Puzzle = new Puzzle(0, '', '', '', 0, '', '');
  public urlImage: string = Global.urlArchivos;
  public tiempoEstimado: number = 0;
  public juegoArmado: boolean = false;
  public estudianteRespuestaPuzzle: Estudianterespuestapuzzle = new Estudianterespuestapuzzle(0, 0, 0, '', '', 0, '');
  public piezasJuntadasCorrectas: number = 0;
  public cantPiezasY: number = 3;
  public cantPiezasx: number = 3;
  public tiempousado: number = 0;
  public contador: number = 1;

  constructor(
    private modalCtrl: ModalController,
    private _puzzleService: PuzzleService,
    private toastController: ToastController,
    private _estudianterespuestaPuzzle: EstudianteRespuestaPuzzleService
  ) { }

  ngOnInit() {
    this.getListPuzzle();
    var intervalo = setInterval(()=>{
      this.contador ++;
      if(this.contador == 4){
        clearInterval(intervalo);
      }
    },1400)
  }

  async piezas(imagen: any) {
    const p = await puzzle({
      element: '#app-puzzle',
      image: this.urlImage + imagen,
      pieces: { x: this.cantPiezasx, y: this.cantPiezasY },
      attraction: 5,   // distance to snap pieces
      aligned: true,   // don't overlap pieces on start
      zoom: 0.8,       // initial zoom of context
      beforeInit: canvas => {
        const intervalo = setInterval(() => {
          if (this.tiempoEstimado == 0 || this.juegoArmado == true) {
            this.tiempousado++;
            this.juegoFinalizado();
            clearInterval(intervalo);
          }
        }, 1000);
      },
      onInit: state => {
      },
      onChange: state => {
        this.piezasJuntadasCorrectas = 0;
        for (let i = 0; i < state.puzzle.pieces.length; i++) {
          if (state.puzzle.pieces[i].connections.length > 0) {
            this.piezasJuntadasCorrectas++;
          }
        }
      },
      onComplete: (state) => {
        this.juegoArmado = true;
      }
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getListPuzzle(): void {
    this._puzzleService.getPuzzleOne(this.idpuzzle).subscribe(
      response => {
        this.puzzle = response.response;
        this.piezas(this.puzzle.imagen);
        this.tiempoEstimado = (+this.puzzle.tiempo_estimado) * 60;
        this.conteoRegresivo();
      }, error => {
        console.log(error);
      }
    )
  }

  conteoRegresivo(): void {
    const interval = setInterval(() => {
      this.tiempoEstimado = this.tiempoEstimado - 1;
      if (this.tiempoEstimado == 0) {
        clearInterval(interval);
        if (this.juegoArmado == false) {
          this.presentToast('top', 'Tiempo finalizado');
        }
      }
    }, 1000)
  }

  juegoFinalizado(): void {
    this.estudianteRespuestaPuzzle.idestudiante = this.idestudiante;
    this.estudianteRespuestaPuzzle.idpuzzle = this.idpuzzle;
    this.estudianteRespuestaPuzzle.puntaje = ((this.piezasJuntadasCorrectas * 100) / (this.cantPiezasY * this.cantPiezasx))/10;
    this.estudianteRespuestaPuzzle.imagenrespuesta = this.puzzle.imagen;
    this.estudianteRespuestaPuzzle.tiempo_usado = this.tiempousado + '';
    this._estudianterespuestaPuzzle.create(this.estudianteRespuestaPuzzle).subscribe(
      response => {
        setTimeout(() => {
          this.presentToast('top', 'Juego finalizado');
          this.cancel();
        }, 1000);
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
