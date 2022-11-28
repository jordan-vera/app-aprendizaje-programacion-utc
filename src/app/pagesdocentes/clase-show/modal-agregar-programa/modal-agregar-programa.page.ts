import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Codigo } from 'src/app/models/Codigo';
import { Programa } from 'src/app/models/Programa';
import { CodigoService } from 'src/app/servicios/codigo.service';
import { ProgramaService } from 'src/app/servicios/programa.service';

@Component({
  selector: 'app-modal-agregar-programa',
  templateUrl: './modal-agregar-programa.page.html',
  styleUrls: ['./modal-agregar-programa.page.scss'],
})
export class ModalAgregarProgramaPage implements OnInit {
  
  @Input() idclase = 0;
  public programa: Programa = new Programa(0, '', 0, '');
  public codigoRespuesta: Codigo[] = [];
  public codigoRespuestaCreate: Codigo = new Codigo(0, '//Escribir', false, 0, '');
  public hayUnaRespuestaCorrecta: boolean = false;
  public fragmentoCodigo: string = '//';
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  constructor(
    private modalCtrl: ModalController,
    private _programaService: ProgramaService,
    private _codigoService: CodigoService,
    private toastController: ToastController,
    private _route: ActivatedRoute,
  ) {
    this._route.params.subscribe((params: Params) => {
      
    });
   }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.editorOptions = { theme: 'vs-dark', language: 'javascript' };
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
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

  guardarPrograma(): void {
    if (this.codigoRespuesta.length > 0) {
      this.programa.idclase = this.idclase;
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
  }


  guardarCodigoRespuesta(data: Codigo, posicion: number): void {
    this._codigoService.create(data).subscribe(
      response => {
        if (posicion == (this.codigoRespuesta.length - 1)) {
          this.limpiar();
          this.presentToast('top', 'Programa guardado corectamente!!')
          this.confirm();
        }
      }, error => {
        console.log(error);
      }
    )
  }

  agregarRespuestaCodigo(): void {
    this.codigoRespuestaCreate.fragmentocodigo = this.fragmentoCodigo;
    this.codigoRespuesta.push(this.codigoRespuestaCreate);
    this.codigoRespuestaCreate = new Codigo(0, '// Escribir código', false, 0, '');
    this.fragmentoCodigo = '';
    this.verificarSiEstaLaPreguntaCorrecta();
  }

  eliminarRespuestaCodigo(posicion: number): void {
    this.codigoRespuesta.splice(posicion, 1)
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
