import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/Cursos';
import { CursosService } from 'src/app/servicios/cursos.service';
import { Global } from 'src/app/servicios/url';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  public cursos: Curso[];
  public nombre: string;
  public urlImagen: string = Global.urlArchivos;

  constructor(
    private _cursoService: CursosService
  ) { }

  ngOnInit() {
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

}
