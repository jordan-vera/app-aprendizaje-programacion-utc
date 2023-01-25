import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Clases } from 'src/app/models/Clases';
import { Programa } from 'src/app/models/Programa';
import { Puzzle } from 'src/app/models/Puzzle';
import { Quizz } from 'src/app/models/Quizz';
import { ClaseService } from 'src/app/servicios/clases.service';
import { ProgramaService } from 'src/app/servicios/programa.service';
import { PuzzleService } from 'src/app/servicios/puzzle.service';
import { QuizzService } from 'src/app/servicios/quizz.service';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { EstudianteProgramasService } from 'src/app/servicios/estudianteprogramas.service';
import { RespuestaCodigoService } from 'src/app/servicios/repuestacodigo.service';
import { EstudianteProgramas } from 'src/app/models/Estudiantesprogramas';
import { RespuestaCodigo } from 'src/app/models/Respuestacodigo';
import { ModalResolucionQuizzPage } from './modal-resolucion-quizz/modal-resolucion-quizz.page';
import { ModalResolucionPuzzlePage } from './modal-resolucion-puzzle/modal-resolucion-puzzle.page';
import { EstudianteRespuestaPuzzleService } from 'src/app/servicios/estudianterespuestapuzzle.service';

@Component({
  selector: 'app-clase-one',
  templateUrl: './clase-one.page.html',
  styleUrls: ['./clase-one.page.scss'],
})
export class ClaseOnePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  public idcurso: number = 0;
  public idclase: number = 0;
  public clase: Clases = new Clases(0, '', 0, true);

  public programas: Programa[];
  public quizzList: Quizz[];
  public puzzleList: Puzzle[];
  public puzzle: Puzzle[] = [];
  public puzzleRespondido: Puzzle[] = [];

  public programasCodigo: any[] = [];
  public programasRespondidos: any[] = [];

  public quizzRespondidos: any[] = [];

  public existePrograma: boolean = true;
  public existeQuizz: boolean = true;
  public existePuzzle: boolean = true;

  public procesoRespuesta: any[] = [];
  public respuestasQuizz: any[] = [];

  public idestudiante: number = 0;
  public existenProgramasResueltos: boolean = false;

  //guardarRespuestas
  public estudianteProgramas: EstudianteProgramas = new EstudianteProgramas(0, 0, 0, '');
  public respuestaCodigo: RespuestaCodigo = new RespuestaCodigo(0, 0, 0, '');

  constructor(
    private _route: ActivatedRoute,
    private _programaService: ProgramaService,
    private _quizzService: QuizzService,
    private _puzzleService: PuzzleService,
    private _claseService: ClaseService,
    private toastController: ToastController,
    private _estudianteprogramasServices: EstudianteProgramasService,
    private _respuestacodigoService: RespuestaCodigoService,
    public modalController: ModalController,
    public _estudianteRespuestaPuzzleService: EstudianteRespuestaPuzzleService
  ) {
    this._route.params.subscribe((params: Params) => {
      this.idcurso = params.idcurso;
      this.idclase = params.idclase;
      this.idestudiante = +localStorage.getItem('idestudiante');
      this.getProgramasResueltos();
      this.getClase();
    });
  }

  ngOnInit() {
  }

  async modalResolucionPuzzle(idpuzzle) {
    const modal = await this.modalController.create({
      component: ModalResolucionPuzzlePage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idpuzzle': idpuzzle,
        'idestudiante': this.idestudiante,
      }
    });
    await modal.present()
    const { data } = await modal.onWillDismiss();
    this.puzzleRespondido = [];
    this.puzzleList = [];
    this.puzzle = [];
    this.getListPuzzle();
    return;
  }

  async modalResolucionQuizz() {
    const modal = await this.modalController.create({
      component: ModalResolucionQuizzPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'idclase': this.idclase,
        'idestudiante': this.idestudiante,
      }
    });
    return await modal.present();
  }

  getProgramasResueltos(): void {
    this._estudianteprogramasServices.getestudianteprogramaIdestudiante(this.idestudiante).subscribe(
      response => {
      }, error => {
        console.log(error)
      }
    )
  }

  guardarRespuestas(): void {
    if (this.procesoRespuesta.length == this.programas.length) {
      for (let x = 0; x < this.procesoRespuesta.length; x++) {
        this.guardarEstudiantePrograma(this.procesoRespuesta[x].idprograma, this.procesoRespuesta[x].idcodigo, x + 1);
      }
    } else {
      this.presentToast('top', 'Tiene que responder todas las preguntas');
    }
  }

  guardarEstudiantePrograma(idprograma: number, idcodigo: number, indice: number): void {
    this.estudianteProgramas.idprograma = idprograma;
    this.estudianteProgramas.idestudiante = this.idestudiante;
    this._estudianteprogramasServices.create(this.estudianteProgramas).subscribe(
      response => {
        this.guardarRespuestaCodigo(response.response, idcodigo);
        if (indice == this.procesoRespuesta.length) {
          this.presentToast('top', 'Proceso finalizado con exito');
          setTimeout(() => {
            this.modal.dismiss(null, 'cancel');
            this.getClase();
          }, 1000);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  guardarRespuestaCodigo(idestudianteprogramas, idcodigo): void {
    this.respuestaCodigo.idestudiante_programas = idestudianteprogramas;
    this.respuestaCodigo.idcodigo = idcodigo;
    this._respuestacodigoService.create(this.respuestaCodigo).subscribe(
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

  seleccionCodigo(idcodigo, idprograma): void {
    for (let i = 0; i < this.programasCodigo.length; i++) {
      if (this.programasCodigo[i].idprograma == idprograma) {
        for (let j = 0; j < this.programasCodigo[i].codigos.length; j++) {
          if (this.programasCodigo[i].codigos[j].idcodigo != idcodigo) {
            var checkBox = document.getElementById(this.programasCodigo[i].codigos[j].idcodigo) as HTMLInputElement;
            checkBox.checked = false;
          } else {
            if (this.procesoRespuesta.length > 0) {
              var cont = this.procesoRespuesta.length;
              var repetidoEncontrado = 'false';
              for (let x = 0; x < cont; x++) {
                if (this.procesoRespuesta[x].idprograma == idprograma) {
                  this.procesoRespuesta = this.procesoRespuesta.filter((item) => item.idprograma !== this.procesoRespuesta[x].idprograma)
                  this.procesoRespuesta.push({ "idcodigo": idcodigo, "idprograma": idprograma });
                  repetidoEncontrado = 'true';
                }
              }
              if (repetidoEncontrado == 'false') {
                this.procesoRespuesta.push({ "idcodigo": idcodigo, "idprograma": idprograma })
              }
            } else {
              this.procesoRespuesta.push({ "idcodigo": idcodigo, "idprograma": idprograma })
            }
          }
        }
      }
    }
  }

  ionViewDidEnter() {
    this.editorOptions = { theme: 'vs-dark', language: 'javascript' };
  }

  getListPuzzle(): void {
    this._puzzleService.getpuzzleAll(this.idclase).subscribe(
      response => {
        if (response.response[0]) {
          this.puzzleList = response.response;
          this.getPuzzLeResueltos();
        } else {
          this.puzzleList = null;
        }

      }, error => {
        console.log(error);
      }
    )
  }

  getPuzzLeResueltos(): void {
    this._estudianteRespuestaPuzzleService.getporestudiante(this.idestudiante).subscribe(
      response => {
        console.log(response)
        var data = response.response;
        this.puzzleRespondido = data;
        for (let i = 0; i < this.puzzleList.length; i++) {
          var encontrado = false;
          for (let j = 0; j < data.length; j++) {
            if (this.puzzleList[i].idpuzzle == data[j].idpuzzle) {
              encontrado = true;
            }
          }
          if (encontrado == false) {
            this.puzzle.push(this.puzzleList[i]);
          }
        }
        if (this.puzzle.length > 0) {
          this.existePuzzle = true;
        } else {
          this.existePuzzle = false;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getQuizzList(): void {
    var arrayRespuestaQuizz = [];
    this.respuestasQuizz = [];
    this._quizzService.getquizzRespuesta(this.idclase, this.idestudiante).subscribe(
      response => {
        this.quizzRespondidos = response.respondidas;
        if (response.norespondidas[0]) {
          this.existeQuizz = true;
          this.quizzList = response.norespondidas;
          for (let i = 0; i < response.norespondidas.length; i++) {
            for (let j = 0; j < response.respuestaquizz.length; j++) {
              if (response.norespondidas[i].idquizz == response.respuestaquizz[j].idquizz) {
                arrayRespuestaQuizz.push(response.respuestaquizz[j]);
              }
            }
            this.respuestasQuizz.push(
              {
                "idquizz": response.norespondidas[i].idprograma,
                "titulo": response.norespondidas[i].titulo,
                "idclase": response.norespondidas[i].idclase,
                "created_at": response.norespondidas[i].created_at,
                "respuestas": arrayRespuestaQuizz,
              }
            )
            arrayRespuestaQuizz = [];
          }
        } else {
          this.quizzList = null;
          this.existeQuizz = false;
        }

        this.getProgramas();
        this.getListPuzzle();
      }, error => {
        console.log(error);
      }
    )
  }

  getProgramas(): void {
    var arrayCodigos = [];
    this.programasCodigo = [];
    this._programaService.getprogramasCodigo(this.idclase, this.idestudiante).subscribe(
      response => {
        this.programasRespondidos = response.respondidas;
        if (response.norespondidas[0]) {
          this.existePrograma = true;
          this.programas = response.norespondidas; // pendiente a eliminar
          for (let i = 0; i < response.norespondidas.length; i++) {
            for (let j = 0; j < response.codigo.length; j++) {
              if (response.norespondidas[i].idprograma == response.codigo[j].idprograma) {
                arrayCodigos.push(response.codigo[j]);
              }
            }
            this.programasCodigo.push(
              {
                "idprograma": response.norespondidas[i].idprograma,
                "titulo": response.norespondidas[i].titulo,
                "idclase": response.norespondidas[i].idclase,
                "created_at": response.norespondidas[i].created_at,
                "codigos": arrayCodigos,
              }
            )
            arrayCodigos = [];
          }
        } else {
          this.programas = null;
          this.existePrograma = false;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getClase(): void {
    this._claseService.getcursoOne(this.idclase).subscribe(
      response => {
        this.clase = response.response;
        //this.getCurso();
        this.getQuizzList();
      }, error => {
        console.log(error)
      }
    )
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

}
