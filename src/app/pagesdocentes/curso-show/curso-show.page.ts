import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Clases } from 'src/app/models/Clases';
import { Curso } from 'src/app/models/Cursos';
import { ClaseService } from 'src/app/servicios/clases.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { Global } from 'src/app/servicios/url';
import { ModalEstudiantesListPage } from './modal-estudiantes-list/modal-estudiantes-list.page';

@Component({
  selector: 'app-curso-show',
  templateUrl: './curso-show.page.html',
  styleUrls: ['./curso-show.page.scss'],
})
export class CursoShowPage implements OnInit {

  public idcurso: number = 0;
  public curso: Curso = new Curso(0, '', 0, '', null);
  public urlImage: string = Global.urlArchivos;
  public clases: Clases[] = [];

  public spinner: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _cursoService: CursosService,
    private modalCtrl: ModalController,
    private _clasesService: ClaseService,
    private toastController: ToastController,
    private _router: Router,
  ) {
    this._route.params.subscribe((params: Params) => {
      this.idcurso = params.idcurso;
      this.getCurso();
      this.getClases();

      this.spinner = true;
      setTimeout(() => {
        this.spinner = false;
      }, 1000);
    });
  }

  ngOnInit() {
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  getCurso(): void {
    this._cursoService.getcursoOne(this.idcurso).subscribe(
      response => {
        this.curso = response.response;
        console.log(this.curso);
      }, error => {
        console.log(error);
      }
    )
  }

  async openModalEstudianteList() {
    const modal = await this.modalCtrl.create({
      component: ModalEstudiantesListPage,
      componentProps: {
        'idcurso': this.idcurso
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
    }
  }

  getClases(): void {
    console.log(this.idcurso)
    this._clasesService.getclases(this.idcurso).subscribe(
      response => {
        console.log(response)
        this.clases = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  eliminarCurso(): void {
    this._cursoService.deletecurso(this.idcurso).subscribe(
      response => {
        this.presentToast('top', 'Curso eliminado correctamente!!');
        this._router.navigate(['/panel/cursos']);
      }, error => {
        console.log(error);
      }
    )
  }

}
