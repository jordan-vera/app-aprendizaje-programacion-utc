import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Estudiante } from 'src/app/models/Estudiante';
import { Usuario } from 'src/app/models/Usuario';
import { EstudiantesService } from 'src/app/servicios/estudiantes.service';
import { UsuarioLoginService } from 'src/app/servicios/usuariologin.service';

@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.page.html',
  styleUrls: ['./perfil-estudiante.page.scss'],
})
export class PerfilEstudiantePage implements OnInit {

  public estudiante: Estudiante = new Estudiante(0, '', '', '', 0);
  public claveantigua: string = '';
  public clavenueva: string = '';
  public usuario: Usuario = new Usuario(0,'','','');

  constructor(
    private _estudianteService: EstudiantesService,
    private toastController: ToastController,
    private _usuarioLoginService: UsuarioLoginService
  ) { }

  ngOnInit() {
    this.getDataEstudiante();
  }

  cambiarContrasena(): void {
    if(this.claveantigua != '' && this.clavenueva != '') {
      this.verificarClave();
    } else {
      this.presentToast('top', 'ingrese contraseña antigua y contraseña nueva!!');
    }
  }

  verificarClave(): void {
    this._usuarioLoginService.verificarClave(this.estudiante.idusuario, this.claveantigua).subscribe(
      response => {
        if (response.response) {
          this.actualizarClave();
        } else {
          this.presentToast('top', 'contraseña antigua incorrecta!!');
        }
      }, error => {
        console.log(error)
      }
    )
  }

  actualizarClave(): void {
    this.usuario.idusuario = this.estudiante.idusuario;
    this.usuario.clave = this.clavenueva;
    this._usuarioLoginService.updateClave(this.usuario).subscribe(
      response => {
        this.presentToast('top', 'contraseña actualizada exitosamente!!');
        this.claveantigua = '';
        this.clavenueva = '';
      }, error => {
        console.log(error)
      }
    )
  }

  actualizarEstudiante(): void {
    this._estudianteService.update(this.estudiante).subscribe(
      response => {
        this.presentToast('top', 'Datos actualizados corectamente!!');
        this.getDataEstudiante();
      }, error => {
        console.log(error)
      }
    )
  }

  getDataEstudiante(): void {
    let idusuario = localStorage.getItem('idusuario') + '';
    this._estudianteService.getOne(idusuario).subscribe(
      response => {
        this.estudiante = response.response;
      }, error => {
        console.log(error);
      }
    )
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
