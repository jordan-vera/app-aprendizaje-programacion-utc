import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UUID } from 'angular2-uuid';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Puzzle } from 'src/app/models/Puzzle';
import { PuzzleService } from 'src/app/servicios/puzzle.service';
import { Global } from 'src/app/servicios/url';

@Component({
  selector: 'app-modal-puzzle-detalle',
  templateUrl: './modal-puzzle-detalle.page.html',
  styleUrls: ['./modal-puzzle-detalle.page.scss'],
})
export class ModalPuzzleDetallePage implements OnInit {

  @Input() idpuzzle = 0;
  public puzzle: Puzzle = new Puzzle(0, '', '', '', 0, '', '');

  public imagenEstado: boolean = false;
  public imagenCargada: any = null;
  public urlImagen: string = Global.urlArchivos;

  public imagenAnterior: string = '';

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private _puzzleService: PuzzleService,
    private imageCompress: NgxImageCompressService,
  ) { }

  ngOnInit() {
    this.getPuzzleOne();
  }

  eliminarPuzzle(): void {
    this._puzzleService.eliminarPuzzleOne(this.idpuzzle, this.imagenAnterior).subscribe(
      response => {
        this.presentToast('top', 'Puzzle eliminado correctamente!!');
        this.confirm();
      }, error => {
        console.log(error);
      }
    )
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

  actualizar(): void {
    console.log(this.puzzle)
    if(this.puzzle.file != '') {
      this.actualizarPortada();
    }
    this.actualizarPuzzleDatos();
  }

  actualizarPuzzleDatos(): void {
    this._puzzleService.update(this.puzzle).subscribe(
      response => {
      }, error => {
        console.log(error);
      }
    )
  }

  actualizarPortada(): void {
    this._puzzleService.updateimagen(this.puzzle, this.imagenAnterior).subscribe(
      response => {
        this.presentToast('top', 'Puzzle actualizado correctamente!!');
      }, error => {
        console.log(error);
      }
    )
  }

  getPuzzleOne(): void {
    this._puzzleService.getPuzzleOne(this.idpuzzle).subscribe(
      response => {
        this.puzzle = response.response;
        this.imagenAnterior = this.puzzle.imagen;
        this.puzzle.file = '';
      }, error => {
        console.log(error)
      }
    )
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
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
