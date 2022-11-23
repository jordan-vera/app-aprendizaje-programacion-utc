import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { Clases } from 'src/app/models/Clases';
import { Codigo } from 'src/app/models/Codigo';
import { Curso } from 'src/app/models/Cursos';
import { Programa } from 'src/app/models/Programa';
import { ClaseService } from 'src/app/servicios/clases.service';
import { CodigoService } from 'src/app/servicios/codigo.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { ProgramaService } from 'src/app/servicios/programa.service';

@Component({
  selector: 'app-clase-show',
  templateUrl: './clase-show.page.html',
  styleUrls: ['./clase-show.page.scss'],
})
export class ClaseShowPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  public idclase: number = 0;
  public clase: Clases = new Clases(0, '', 0, true);
  public curso: Curso = new Curso(0, '', 0, '', null);

  public programa: Programa = new Programa(0, '', 0, '');
  public codigoRespuesta: Codigo[] = [];
  public codigoRespuestaCreate: Codigo = new Codigo(0, '', false, 0, '');
  public hayUnaRespuestaCorrecta: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _claseService: ClaseService,
    private _cursoService: CursosService,
    private _programaService: ProgramaService,
    private _codigoService: CodigoService,
    private toastController: ToastController
  ) {
    this._route.params.subscribe((params: Params) => {
      this.idclase = params.idclase;
      this.getClase();
    });
  }

  ngOnInit() {
  }

  guardarPrograma(): void {
    if (this.codigoRespuesta.length > 0) {
      this._programaService.create(this.programa).subscribe(
        response => {
          let idprograma = response.response;
          for (let i = 0; i < this.codigoRespuesta.length; i++) {
            this.guardarCodigoRespuesta(new Codigo(0, this.codigoRespuesta[i].fragmentocodigo, this.codigoRespuesta[i].respuestacorrecta, idprograma, ''), i);
          }
        }, error => {
          console.log(error);
        }
      )
    } else {
      this.presentToast('top', 'Tiene que ingresar al menos una pregunta!!')
    }
  }

  limpiar(): void {
    this.programa = new Programa(0, '', 0, '');
    this.codigoRespuesta = [];
    this.cancel();
  }

  guardarCodigoRespuesta(data: Codigo, posicion: number): void {
    this._codigoService.create(data).subscribe(
      response => {
        if (posicion == (this.codigoRespuesta.length - 1)) {
          this.limpiar();
          this.presentToast('top', 'Programa guardado corectamente!!')
        }
      }, error => {
        console.log(error);
      }
    )
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  agregarRespuestaCodigo(): void {
    this.codigoRespuesta.push(this.codigoRespuestaCreate);
    this.codigoRespuestaCreate = new Codigo(0, '', false, 0, '');
    this.verificarSiEstaLaPreguntaCorrecta();
  }

  eliminarRespuestaCodigo(posicion: number): void {
    this.codigoRespuesta.splice(posicion, 1)
  }

  verificarSiEstaLaPreguntaCorrecta(): void {
    this.hayUnaRespuestaCorrecta = false;
    if (this.codigoRespuesta.length > 0) {
      for (let i = 0; i < this.codigoRespuesta.length; i++) {
        if (this.codigoRespuesta[i].respuestacorrecta == true) {
          this.hayUnaRespuestaCorrecta = true;
        }
      }
    }
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
