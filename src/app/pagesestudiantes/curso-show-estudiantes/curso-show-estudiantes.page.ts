import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Clases } from 'src/app/models/Clases';
import { Cursoestudiante } from 'src/app/models/Cursoestudiante';
import { Curso } from 'src/app/models/Cursos';
import { ClaseService } from 'src/app/servicios/clases.service';
import { CursoEstudianteService } from 'src/app/servicios/cursoestudiante.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { Global } from 'src/app/servicios/url';

@Component({
  selector: 'app-curso-show-estudiantes',
  templateUrl: './curso-show-estudiantes.page.html',
  styleUrls: ['./curso-show-estudiantes.page.scss'],
})
export class CursoShowEstudiantesPage implements OnInit {

  public idcurso: number = 0;
  public curso: Curso = new Curso(0, '', 0, '', null);
  public urlImage: string = Global.urlArchivos;
  public cursoestudiante: Cursoestudiante = new Cursoestudiante(0, 0, 0, '');
  public cursoestudianteCreate: Cursoestudiante = new Cursoestudiante(0, 0, 0, '');
  public estado = '';
  public clasesList: Clases[];
  public spinner: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _cursoService: CursosService,
    private _cursoestudianteService: CursoEstudianteService,
    private toastController: ToastController,
    private _clasesService: ClaseService
  ) {
    this._route.params.subscribe((params: Params) => {
      this.idcurso = params.idcurso;
      this.getCurso();
      this.getcursoestudiante();
      this.getClases();
      this.spinner = true;
      setTimeout(() => {
        this.spinner = false;
      }, 1000);
    });
  }

  ngOnInit() {
  }

  getClases(): void {
    this._clasesService.getclases(this.idcurso).subscribe(
      response => {
        this.clasesList = response.response;
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

  unirseAlCurso(): void {
    this.cursoestudianteCreate.estado_aceptado = 'pendiente';
    this.cursoestudianteCreate.idcurso = this.idcurso;
    this.cursoestudianteCreate.idestudiante = +localStorage.getItem('idestudiante');
    this._cursoestudianteService.create(this.cursoestudianteCreate).subscribe(
      response => {
        this.presentToast('top', 'Has solicitado unirte al grupo');
        this.getcursoestudiante();
      }, error => {
        console.log(error);
      }
    )
  }

  getcursoestudiante(): void {
    var idestudiante = localStorage.getItem('idestudiante');
    this._cursoestudianteService.getcursoestudiante(+idestudiante, this.idcurso).subscribe(
      response => {
        this.cursoestudiante = response.response;
        if (response.response) {
          this.estado = this.cursoestudiante.estado_aceptado;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getCurso(): void {
    this._cursoService.getcursoOne(this.idcurso).subscribe(
      response => {
        this.curso = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

}
