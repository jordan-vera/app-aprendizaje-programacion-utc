import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { UUID } from 'angular2-uuid';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Curso } from 'src/app/models/Cursos';
import { CursosService } from 'src/app/servicios/cursos.service';
import { Global } from 'src/app/servicios/url';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  public imagenEstado: boolean = false;
  public cursoCreate: Curso = new Curso(0, '', 0, '', null);
  public cursosList: Curso[];
  public imagenCargada: any = null;
  public urlImagen: string = Global.urlArchivos;

  public spinner: boolean = true;

  constructor(
    private imageCompress: NgxImageCompressService,
    private _cursoService: CursosService,
    private toastController: ToastController,
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
    this.getCursos();
  }

  getCursos(): void {
    this._cursoService.getcursos(+localStorage.getItem('iddocente')).subscribe(
      response => {
        this.cursosList = response.response;
      }, error => {
        console.log(error);
      }
    )
  }

  guardarCurso(): void {
    this.cursoCreate.iddocente = +localStorage.getItem('iddocente');
    this._cursoService.create(this.cursoCreate).subscribe(
      response => {
        this.presentToast('top', 'Curso guardado correctamente!!')
        this.cancel();
        this.getCursos();
      }, error => {
        console.log(error);
      }
    )
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  cargarImagen() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imagenEstado = true;
      var head = image.split(',')[0];
      var subHead = head.split('/')[1];
      var extension = subHead.split(';')[0];
      this.cursoCreate.imagen = UUID.UUID() + '.' + extension;
      if (this.imageCompress.byteCount(image) > 1000000) {
        this.imagenCargada = image;
        this.cursoCreate.file = image.split(',')[1];
      } else {
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            this.imagenCargada = result;
            this.cursoCreate.file = result.split(',')[1];
          }
        );
      }
    })
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}
