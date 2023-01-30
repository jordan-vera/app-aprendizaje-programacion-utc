import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Clases } from 'src/app/models/Clases';
import { Estudiante } from 'src/app/models/Estudiante';
import { Programa } from 'src/app/models/Programa';
import { Puzzle } from 'src/app/models/Puzzle';
import { ClaseService } from 'src/app/servicios/clases.service';
import { EstudianteRespuestaPuzzleService } from 'src/app/servicios/estudianterespuestapuzzle.service';
import { EstudiantesService } from 'src/app/servicios/estudiantes.service';
import { ProgramaService } from 'src/app/servicios/programa.service';
import { PuzzleService } from 'src/app/servicios/puzzle.service';
import { QuizzService } from 'src/app/servicios/quizz.service';

@Component({
  selector: 'app-estudiantes-respuestas-show',
  templateUrl: './estudiantes-respuestas-show.page.html',
  styleUrls: ['./estudiantes-respuestas-show.page.scss'],
})
export class EstudiantesRespuestasShowPage implements OnInit {

  public idestudiante: number = 0;
  public idcurso: number = 0;
  public estudiante: Estudiante = new Estudiante(0, '', '', '', 0);
  public clases: Clases[] = [];

  public programasRespondidos: any[] = [];
  public programas: Programa[];
  public quizzRespondidos: any[] = [];
  public puzzleRespondido: Puzzle[] = [];

  public spinner: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _estudianteService: EstudiantesService,
    private _claseService: ClaseService,
    private _programaService: ProgramaService,
    private _quizzService: QuizzService,
    public _estudianteRespuestaPuzzleService: EstudianteRespuestaPuzzleService
  ) {
    this._route.params.subscribe((params: Params) => {
      this.idestudiante = params.idestudiante;
      this.idcurso = params.idcurso;
      this.GetestudianteService();
      this.getClases();
      this.getPuzzLeResueltos();
      this.spinner = true;
      setTimeout(() => {
        this.spinner = false;
      }, 1000);
    });
  }

  ngOnInit() {
  }

  GetestudianteService(): void {
    this._estudianteService.getOneEstudiante(this.idestudiante).subscribe(
      response => {
        this.estudiante = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  getClases(): void {
    this._claseService.getclases(this.idcurso).subscribe(
      response => {
        this.clases = response.response;
        for (let i = 0; i < this.clases.length; i++) {
          this.getProgramas(this.clases[i].idclase);
          setTimeout(() => {
            this.getQuizzList(this.clases[i].idclase);
          }, 800);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getQuizzList(idclase): void {
    this._quizzService.getquizzRespuesta(idclase, this.idestudiante).subscribe(
      response => {
        for (let i = 0; i < response.respondidas.length; i++) {
          this.quizzRespondidos.push(response.respondidas[i])
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getProgramas(idclase): void {
    this._programaService.getprogramasCodigo(idclase, this.idestudiante).subscribe(
      response => {
        for (let i = 0; i < response.respondidas.length; i++) {
          this.programasRespondidos.push(response.respondidas[i])
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getPuzzLeResueltos(): void {
    this._estudianteRespuestaPuzzleService.getporestudiante(this.idestudiante).subscribe(
      response => {
        var data = response.response;
        this.puzzleRespondido = data;
      }, error => {
        console.log(error);
      }
    )
  }

}
