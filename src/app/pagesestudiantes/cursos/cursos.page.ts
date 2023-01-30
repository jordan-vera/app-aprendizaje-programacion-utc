import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Curso } from 'src/app/models/Cursos';
import { CursoEstudianteService } from 'src/app/servicios/cursoestudiante.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { Global } from 'src/app/servicios/url';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  public cursos: Curso[];
  public cursosAprobados: Curso[];
  public nombre: string;
  public urlImagen: string = Global.urlArchivos;
  public idestudiante: number = 0;
  public spinner: boolean = true;

  constructor(
    private _cursoService: CursosService,
    private _cursoestudianteService: CursoEstudianteService,
    private _route: ActivatedRoute,
  ) { 
    this._route.params.subscribe((params: Params) => {
      this.spinner = true;
      setTimeout(() => {
        this.spinner = false;
      }, 1000);
    });
  }

  ngOnInit() {
    this.idestudiante = +localStorage.getItem('idestudiante');
    this.buscarCursosPermitidospordocente();
  }

  buscarCursos(): void {
    this._cursoService.getcursoSearch(this.nombre).subscribe(
      response => {
        this.cursos = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  buscarCursosPermitidospordocente(): void {
    this._cursoestudianteService.getcursoestudianteaprobados(this.idestudiante).subscribe(
      response => {
        this.cursosAprobados = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

}
