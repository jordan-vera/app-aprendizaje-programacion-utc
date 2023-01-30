import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioLoginService } from '../servicios/usuariologin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public nick: string = '';
  public clave: string = '';
  public veces: number[] = [1,2,3,4,5,6];

  constructor(
    private _router: Router,
    private _usuariologinServicio: UsuarioLoginService
  ) { }

  ngOnInit() {
  }

  ingresar(): void {
    if (this.nick == '' || this.clave == '') {
      return;
    } else {
      this._usuariologinServicio.loginUser(this.nick, this.clave).subscribe(
        response => {
          if (response.response) {
            localStorage.setItem('idusuario', response.response.idusuario);
            localStorage.setItem('tipouser', response.response.tipo);
            this._router.navigate(['/panel']);
          } else {
            alert('Credenciales incorrectas');
          }
        }, error => {
          console.log(error);
        }
      )
    }
  }

}
