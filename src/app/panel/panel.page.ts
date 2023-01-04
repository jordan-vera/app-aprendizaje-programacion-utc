import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocenteService } from '../servicios/docente.service';
import { EstudiantesService } from '../servicios/estudiantes.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {

  public tipouser: string = '';
  public titulo: string = 'Desboard';
  public nombres: string = '';

  constructor(
    private _docenteService: DocenteService,
    private _estudianteService: EstudiantesService,
    private _router: Router,
  ) {
    this.tipouser = localStorage.getItem('tipouser') + '';
    console.log(this.tipouser)
    if (this.tipouser == 'docente') {
      localStorage.removeItem('idestudiante');
      this.getDataDocente();
    } else if (this.tipouser == 'estudiante') {
      localStorage.removeItem('iddocente')
      this.getDataEstudiante();
    }
  }

  ngOnInit() {
  }

  getDataEstudiante(): void {
    let idusuario = localStorage.getItem('idusuario') + '';
    this._estudianteService.getOne(idusuario).subscribe(
      response => {
        localStorage.setItem('idestudiante', response.response.idestudiante);
        this.nombres = response.response.nombres;
      }, error => {
        console.log(error);
      }
    )
  }

  cerrarSesion(): void {
    this._router.navigate(['/login']);
    localStorage.removeItem('idusuario');
    localStorage.removeItem('tipouser');
  }

  irHaPaginas(titulo: string, url: string): void {
    this.titulo = titulo;
    this._router.navigate([url]);
  }

  getDataDocente(): void {
    let idusuario = localStorage.getItem('idusuario') + '';
    this._docenteService.getdocenteone(+idusuario).subscribe(
      response => {
        if (response.response) {
          localStorage.setItem('iddocente', response.response.iddocente);
          this.nombres = response.response.nombres;
        }
      }, error => {
        console.log(error);
      }
    )
  }

}
