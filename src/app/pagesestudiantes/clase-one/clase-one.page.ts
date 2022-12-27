import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Clases } from 'src/app/models/Clases';
import { Programa } from 'src/app/models/Programa';
import { Puzzle } from 'src/app/models/Puzzle';
import { Quizz } from 'src/app/models/Quizz';
import { ClaseService } from 'src/app/servicios/clases.service';
import { ProgramaService } from 'src/app/servicios/programa.service';
import { PuzzleService } from 'src/app/servicios/puzzle.service';
import { QuizzService } from 'src/app/servicios/quizz.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-clase-one',
  templateUrl: './clase-one.page.html',
  styleUrls: ['./clase-one.page.scss'],
})
export class ClaseOnePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  public idcurso: number = 0;
  public idclase: number = 0;
  public clase: Clases = new Clases(0, '', 0, true);

  public programas: Programa[];
  public quizzList: Quizz[];
  public puzzleList: Puzzle[];

  public programasCodigo: any[] = [];

  public existePrograma: boolean = true;
  public existeQuizz: boolean = true;
  public existePuzzle: boolean = true;

  public procesoRespuesta: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _programaService: ProgramaService,
    private _quizzService: QuizzService,
    private _puzzleService: PuzzleService,
    private _claseService: ClaseService,
  ) {
    this._route.params.subscribe((params: Params) => {
      this.idcurso = params.idcurso;
      this.idclase = params.idclase;
      this.getClase();
    });
  }

  ngOnInit() {
  }

  seleccionCodigo(idcodigo, idprograma): void {
    for(let i = 0; i < this.programasCodigo.length; i++) {
      if(this.programasCodigo[i].idprograma == idprograma) {
        for(let j = 0; j < this.programasCodigo[i].codigos.length; j++){
          if(this.programasCodigo[i].codigos[j].idcodigo != idcodigo){
            var checkBox = document.getElementById(this.programasCodigo[i].codigos[j].idcodigo) as HTMLInputElement;
            checkBox.checked = false;
          } else {
            if(this.procesoRespuesta.length > 0){
              var cont = this.procesoRespuesta.length;
           
              for(let x = 0; x < cont; x++) {
                if(this.procesoRespuesta[x].idprograma == idprograma) {
                  console.log("eliminacion en posicion " + x)
                  this.procesoRespuesta = this.procesoRespuesta.filter((item) => item.idprograma !== this.procesoRespuesta[x].idprograma)
                  this.procesoRespuesta.push({"idcodigo":idcodigo, "idprograma":idprograma})
                } else {
                  this.procesoRespuesta.push({"idcodigo":idcodigo, "idprograma":idprograma})
                }
              }

            } else {
              this.procesoRespuesta.push({"idcodigo":idcodigo, "idprograma":idprograma})
            }
          }
        }
      }
    }
    console.log(this.procesoRespuesta)
  }




  ionViewDidEnter() {
    this.editorOptions = { theme: 'vs-dark', language: 'javascript' };
  }

  getListPuzzle(): void {
    this._puzzleService.getpuzzleAll(this.idclase).subscribe(
      response => {
        if (response.response[0]) {
          this.existePuzzle = true;
          this.puzzleList = response.response;
        } else {
          this.existePuzzle = false;
          this.puzzleList = null;
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getQuizzList(): void {
    this._quizzService.getquizzAll(this.idclase).subscribe(
      response => {
        if (response.response[0]) {
          this.existeQuizz = true;
          this.quizzList = response.response;
        } else {
          this.existeQuizz = false;
          this.quizzList = null;
        }
        this.getProgramas();
        this.getListPuzzle();
      }, error => {
        console.log(error);
      }
    )
  }

  getProgramas(): void {
    var arrayCodigos = [];
    this.programasCodigo = [];
    this._programaService.getprogramasCodigo(this.idclase).subscribe(
      response => {
        if (response.response[0]) {
          this.existePrograma = true;
          this.programas = response.response; // pendiente a eliminar
          for (let i = 0; i < response.response.length; i++) {
            for (let j = 0; j < response.codigo.length; j++) {
              if (response.response[i].idprograma == response.codigo[j].idprograma) {
                arrayCodigos.push(response.codigo[j]);
              }
            }
            this.programasCodigo.push(
              {
                "idprograma": response.response[i].idprograma,
                "titulo": response.response[i].titulo,
                "idclase": response.response[i].idclase,
                "created_at": response.response[i].created_at,
                "codigos": arrayCodigos,
              }
            )
            arrayCodigos = [];
          }
        } else {
          this.programas = null;
          this.existePrograma = false;
        }
        console.log(this.procesoRespuesta);
      }, error => {
        console.log(error);
      }
    )
  }

  getClase(): void {
    this._claseService.getcursoOne(this.idclase).subscribe(
      response => {
        this.clase = response.response;
        //this.getCurso();
        this.getQuizzList();
      }, error => {
        console.log(error)
      }
    )
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

}
