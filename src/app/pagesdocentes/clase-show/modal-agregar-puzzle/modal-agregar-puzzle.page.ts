import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UUID } from 'angular2-uuid';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Puzzle } from 'src/app/models/Puzzle';
import { PuzzleService } from 'src/app/servicios/puzzle.service';
import { Global } from 'src/app/servicios/url';

@Component({
  selector: 'app-modal-agregar-puzzle',
  templateUrl: './modal-agregar-puzzle.page.html',
  styleUrls: ['./modal-agregar-puzzle.page.scss'],
})
export class ModalAgregarPuzzlePage implements OnInit {
  @Input() idclase = 0;

  public puzzle: Puzzle = new Puzzle(0, '', '', '', 0, '', null);
  public imagenEstado: boolean = false;
  public imagenCargada: any = null;
  public urlImagen: string = Global.urlArchivos;

  constructor(
    private modalCtrl: ModalController,
    private imageCompress: NgxImageCompressService,
    private _puzzleService: PuzzleService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
  }

  guardarPuzzle(): void {
    if (this.puzzle.titulo == '' || this.puzzle.tiempo_estimado == '' || this.puzzle.imagen == '') {

    } else {
      this.puzzle.idclase = this.idclase;
      this._puzzleService.create(this.puzzle).subscribe(
        response => {
          this.presentToast('top', 'Respuesta actualizada!!');
          this.confirm();
        }, error => {
          console.log(error);
        }
      )
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  cargarImagen() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imagenEstado = true;
      var head = image.split(',')[0];
      var subHead = head.split('/')[1];
      var extension = subHead.split(';')[0];
      this.puzzle.imagen = UUID.UUID() + '.' + extension;
      if (this.imageCompress.byteCount(image) > 1000000) {
        this.imagenCargada = image;
        this.puzzle.file = image.split(',')[1];
      } else {
        this.imageCompress.compressFile(image, orientation, 50, 50).then(
          result => {
            this.imagenCargada = result;
            this.puzzle.file = result.split(',')[1];
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
