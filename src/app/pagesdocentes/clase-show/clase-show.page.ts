import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { Clases } from 'src/app/models/Clases';
import { Codigo } from 'src/app/models/Codigo';
import { Curso } from 'src/app/models/Cursos';
import { Programa } from 'src/app/models/Programa';
import { ClaseService } from 'src/app/servicios/clases.service';
import { CodigoService } from 'src/app/servicios/codigo.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ProgramaService } from 'src/app/servicios/programa.service';
import { ModalAgregarProgramaPage } from './modal-agregar-programa/modal-agregar-programa.page';
import { ModalAgregarQuizzPage } from './modal-agregar-quizz/modal-agregar-quizz.page';

@Component({
  selector: 'app-clase-show',
  templateUrl: './clase-show.page.html',
  styleUrls: ['./clase-show.page.scss'],
})
export class ClaseShowPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  isModalOpen = false;
  isModalOpenQuizCreate = false;
  isModalOpenPrograma = false;

  @Input() activeTheme = 'vs';
  @Input() readOnly = false;

  public clase: Clases = new Clases(0, '', 0, true);
  public curso: Curso = new Curso(0, '', 0, '', null);

  public programas: Programa[];
  public codigosDetalle: Codigo[] = [];
  public programaDetalleOne: Programa = new Programa(0, '', 0, '');
  public idclase: number = 0;

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
  ) {
    this._route.params.subscribe((params: Params) => {
      this.idclase = params.idclase;
      this.getClase();
    });
  }

  ngOnInit() {
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
      // actualizar quizz
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
