import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'

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

}