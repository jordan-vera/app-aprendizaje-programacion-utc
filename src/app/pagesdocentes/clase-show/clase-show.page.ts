import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { Clases } from 'src/app/models/Clases';
import { Codigo } from 'src/app/models/Codigo';
import { Curso } from 'src/app/models/Cursos';
import { Programa } from 'src/app/models/Programa';
import { Puzzle } from 'src/app/models/Puzzle';
import { Quizz } from 'src/app/models/Quizz';
import { ClaseService } from 'src/app/servicios/clases.service';
import { CodigoService } from 'src/app/servicios/codigo.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ProgramaService } from 'src/app/servicios/programa.service';
import { PuzzleService } from 'src/app/servicios/puzzle.service';
import { QuizzService } from 'src/app/servicios/quizz.service';
import { ModalAgregarProgramaPage } from './modal-agregar-programa/modal-agregar-programa.page';
import { ModalAgregarPuzzlePage } from './modal-agregar-puzzle/modal-agregar-puzzle.page';
import { ModalAgregarQuizzPage } from './modal-agregar-quizz/modal-agregar-quizz.page';
import { ModalQuizzDetallePage } from './modal-quizz-detalle/modal-quizz-detalle.page';

@Component({
  selector: 'app-clase-show',
  templateUrl: './clase-show.page.html',
  styleUrls: ['./clase-show.page.scss'],
})
export class ClaseShowPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  isModalOpen = false;
  isModalOpenQuizDetalle = false;
  isModalOpenPrograma = false;

  @Input() activeTheme = 'vs';
  @Input() readOnly = false;

  public clase: Clases = new Clases(0, '', 0, true);
  public curso: Curso = new Curso(0, '', 0, '', null);

  public programas: Programa[];
  public codigosDetalle: Codigo[] = [];
  public programaDetalleOne: Programa = new Programa(0, '', 0, '');
  public idclase: number = 0;

  public quizzList: Quizz[] = [];

  public puzzleList: Puzzle[] = [];

  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  editorOptions2 = { theme: 'vs-dark', language: 'javascript' };

  constructor(
    private _route: ActivatedRoute,
    private _claseService: ClaseService,
    private _cursoService: CursosService,
    private _codigoService: CodigoService,
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private _programaService: ProgramaService,
    private _quizzService: QuizzService,
    private _puzzleService: PuzzleService
  ) {
    this._route.params.subscribe((params: Params) => {
      this.idclase = params.idclase;
      this.getClase();
    });
  }

  ngOnInit() {
  }

  async openModalAddPuzzle() {
    const modal = await this.modalCtrl.create({
      component: ModalAgregarPuzzlePage,
      componentProps: {
        'idclase': this.idclase
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.getListPuzzle(); 
    }
  }

  getListPuzzle(): void {
    this._puzzleService.getpuzzleAll(this.idclase).subscribe(
      response => {
        this.puzzleList = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  async setOpenModalQuizzDetalle(idquizz: number) {
    const modal = await this.modalCtrl.create({
      component: ModalQuizzDetallePage,
      componentProps: {
        'idquizz': idquizz
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.getQuizzList(); 
    }  else {
      this.getQuizzList();
    }
  }

  getQuizzList(): void {
    this._quizzService.getquizzAll(this.idclase).subscribe(
      response => {
        this.quizzList = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  async openModalAddQuizz() {
    const modal = await this.modalCtrl.create({
      component: ModalAgregarQuizzPage,
      componentProps: {
        'idclase': this.idclase
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.getQuizzList(); 
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalAgregarProgramaPage,
      componentProps: {
        'idclase': this.idclase
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.getProgramas();
    }
  }

  eliminarPreguntaProgramaCodigos(): void {
    this._programaService.eliminarPrograma(this.programaDetalleOne.idprograma).subscribe(
      response => {
        this._codigoService.eliminarAllCodigos(this.programaDetalleOne.idprograma).subscribe(
          response => {
            this.presentToast('top', 'Programa eliminado corectamente!!');
            this.isModalOpen = false;
            this.getProgramas();
          }, error => {
            console.log(error);
          }
        )
      }, error => {
        console.log(error);
      }
    )
  }

  setOpen(isOpen: boolean, idclase: number, tituloprograma: string, idprograma: number, fechaprograma: string) {
    this.isModalOpen = isOpen;
    if (isOpen == true) {
      this.programaDetalleOne = new Programa(idprograma, tituloprograma, idclase, fechaprograma);
      this.getCodigoOne(idprograma);
    }
  }

  getCodigoOne(idprograma: number): void {
    this._codigoService.getcodigos(idprograma).subscribe(
      response => {
        this.codigosDetalle = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getProgramas(): void {
    this._programaService.getprogramas(this.idclase).subscribe(
      response => {
        this.programas = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getClase(): void {
    this._claseService.getcursoOne(this.idclase).subscribe(
      response => {
        this.clase = response.response;
        this.getCurso();
        this.getQuizzList();
      }, error => {
        console.log(error)
      }
    )
  }

  getCurso(): void {
    this._cursoService.getcursoOne(this.clase.idcurso).subscribe(
      response => {
        this.curso = response.response;
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
