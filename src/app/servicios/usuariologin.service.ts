import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Usuario } from '../models/Usuario';

@Injectable()
export class UsuarioLoginService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    loginUser(nick: string, clave: string): Observable<any> {
        return this._http.get(this.url + 'login/' + nick + '/' + clave);
    }

    verificarClave(idusuario: number, clave: string): Observable<any> {
        return this._http.get(this.url + 'verificar-clave/' + idusuario + '/' + clave);
    }

    updateClave(data: Usuario): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'clave-update', params);
    }
}