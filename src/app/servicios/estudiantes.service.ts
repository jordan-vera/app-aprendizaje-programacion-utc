import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'

@Injectable()
export class EstudiantesService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    getOne(idusuario: string): Observable<any> {
        return this._http.get(this.url + 'estudiante/' + idusuario);
    }
}