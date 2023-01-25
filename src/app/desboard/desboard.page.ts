import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClaseService } from '../servicios/clases.service';
import { CursosService } from '../servicios/cursos.service';
import { DocenteService } from '../servicios/docente.service';
import { EstudiantesService } from '../servicios/estudiantes.service';

@Component({
  selector: 'app-desboard',
  templateUrl: './desboard.page.html',
  styleUrls: ['./desboard.page.scss'],
})
export class DesboardPage implements OnInit {

  public tipouser: string = '';
  public nombre: string = '';
  public countCursoDocente: number = 0;
  public countClasesDocente: number = 0;
  public countEstudianteDocente: number = 0;
  public countCursoEstudiante: number = 0;

  constructor(
    private _docenteService: DocenteService,
    private _estudianteService: EstudiantesService,
    private _router: Router,
    private _cursoService: CursosService,
    private _claseService: ClaseService,
    private _route: ActivatedRoute,
  ) {
    this._route.params.subscribe((params: Params) => {
      this.tipouser = localStorage.getItem('tipouser') + '';
    if (this.tipouser == 'docente') {
      localStorage.removeItem('idestudiante');
      this.getDataDocente();
    } else if (this.tipouser == 'estudiante') {
      localStorage.removeItem('iddocente')
      this.getDataEstudiante();
    }
    });

    
  }

  ngOnInit() {
  }

  getDataEstudiante(): void {
    let idusuario = localStorage.getItem('idusuario') + '';
    this._estudianteService.getOne(idusuario).subscribe(
      response => {
        this.nombre = response.response.nombres;
        this.getCountCursoEstudiante(response.response.idestudiante)
      }, error => {
        console.log(error);
      }
    )
  }

  getDataDocente(): void {
    let idusuario = localStorage.getItem('idusuario') + '';
    this._docenteService.getdocenteone(+idusuario).subscribe(
      response => {
        if (response.response) {
          this.nombre = response.response.nombres;
          this.getCountCurso(response.response.iddocente);
          this.getClaseService(response.response.iddocente);
          this.getEstudianteCurso(response.response.iddocente);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getCountCurso(iddocente: number): void {
    this._cursoService.getcursoCount(iddocente).subscribe(
      response => {
        this.countCursoDocente = response.response
      }, error => {
        console.log(error);
      }
    )
  }

  getClaseService(iddocente): void {
    this._claseService.getCountPorDocente(iddocente).subscribe(
      response => {
        this.countClasesDocente = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getEstudianteCurso(iddocente): void {
    this._estudianteService.getCountPorDocente(iddocente).subscribe(
      response => {
        this.countEstudianteDocente = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getCountCursoEstudiante(idestudiante: number): void {
    this._cursoService.getcursoCountEstudiante(idestudiante).subscribe(
      response => {
        console.log(response)
        this.countCursoEstudiante = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

}
