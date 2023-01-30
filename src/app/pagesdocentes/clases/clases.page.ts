import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ToastController } from '@ionic/angular';
import { Clases } from 'src/app/models/Clases';
import { Curso } from 'src/app/models/Cursos';
import { ClaseService } from 'src/app/servicios/clases.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { Global } from 'src/app/servicios/url';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  public claseCreate: Clases = new Clases(0, '', 0, false);
  public cursosList: Curso[];
  public clasesList: Clases[];

  public spinner: boolean = true;

  constructor(
    private _claseService: ClaseService,
    private _cursoService: CursosService,
    private toastController: ToastController
  ) {
    this.spinner = true;
      setTimeout(() => {
        this.spinner = false;
      }, 1000);
   }

  ngOnInit() {
    this.getCursos();
    this.getClases();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  getClases(): void {
    this._claseService.getPorDocente(+localStorage.getItem('iddocente')).subscribe(
      response => {
        console.log(response)
        this.clasesList = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  guardarClase(): void {
    this.claseCreate.esactiva = true;
    this._claseService.create(this.claseCreate).subscribe(
      response => {
        this.presentToast('top', 'Clase guardado correctamente!!')
        this.cancel();
        this.getClases();
      }, error => {
        console.log(error);
      }
    )
  }

  getCursos(): void {
    this._cursoService.getcursos(+localStorage.getItem('iddocente')).subscribe(
      response => {
        this.cursosList = response.response;
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
