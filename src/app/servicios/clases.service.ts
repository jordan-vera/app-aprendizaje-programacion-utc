import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Clases } from '../models/Clases';

@Injectable()
export class ClaseService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Clases): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'clase', params);
    }

    getclases(idcurso: number): Observable<any> {
        return this._http.get(this.url + 'clases/' + idcurso);
    }

    getCountPorDocente(iddocente: number): Observable<any> {
        return this._http.get(this.url + 'clases-count-docente/' + iddocente);
    }

    getcursoOne(idclase: number): Observable<any> {
        return this._http.get(this.url + 'clase-one/' + idclase);
    }

}