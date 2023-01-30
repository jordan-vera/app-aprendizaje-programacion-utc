import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Cursoestudiante } from 'src/app/models/Cursoestudiante';
import { Estudiante } from 'src/app/models/Estudiante';
import { CursoEstudianteService } from 'src/app/servicios/cursoestudiante.service';

@Component({
  selector: 'app-modal-estudiantes-list',
  templateUrl: './modal-estudiantes-list.page.html',
  styleUrls: ['./modal-estudiantes-list.page.scss'],
})
export class ModalEstudiantesListPage implements OnInit {
  @Input() idcurso: number;

  public estudiantes: Estudiante[] = [];
  public cursoEstudiante: Cursoestudiante = new Cursoestudiante(0, 0, 0, '');

  constructor(
    private modalCtrl: ModalController,
    private _cursoEstudianteService: CursoEstudianteService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getEstudiantes();
  }

  irEstudianteShow(idestudiante): void {
    this._router.navigate(['/panel/estudiantes-respuestas', idestudiante, this.idcurso]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  getEstudiantes(): void {
    this._cursoEstudianteService.getestudiantesporcurso(this.idcurso).subscribe(
      response => {
        console.log(response)
        this.estudiantes = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  aprobarEstudiante(idcursoestudiante: number): void {
    this.cursoEstudiante.estado_aceptado = 'aprobado';
    this.cursoEstudiante.idcurso_estudiante = idcursoestudiante;
    this._cursoEstudianteService.cambiarestado(this.cursoEstudiante).subscribe(
      response => {
        this.getEstudiantes();
      }, error => {
        console.log(error);
      }
    )
  }

}
