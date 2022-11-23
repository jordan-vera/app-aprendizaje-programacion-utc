import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Curso } from 'src/app/models/Cursos';
import { CursosService } from 'src/app/servicios/cursos.service';
import { Global } from 'src/app/servicios/url';

@Component({
  selector: 'app-curso-show',
  templateUrl: './curso-show.page.html',
  styleUrls: ['./curso-show.page.scss'],
})
export class CursoShowPage implements OnInit {

  public idcurso: number = 0;
  public curso: Curso = new Curso(0,'',0,'',null);
  public urlImage: string = Global.urlArchivos;

  constructor(
    private _route: ActivatedRoute,
    private _cursoService: CursosService
  ) { 
    this._route.params.subscribe((params: Params) => {
      this.idcurso = params.idcurso;     
      this.getCurso(); 
    });
  }

  ngOnInit() {
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

}
