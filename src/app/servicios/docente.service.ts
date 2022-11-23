import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'

@Injectable()
export class DocenteService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    getdocenteone(idusuario: number): Observable<any> {
        return this._http.get(this.url + 'docente/' + idusuario);
    }

}