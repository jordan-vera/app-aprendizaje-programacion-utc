import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Programa } from '../models/Programa';

@Injectable()
export class ProgramaService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Programa): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'programa', params);
    }

    getprogramas(idclase: number): Observable<any> {
        return this._http.get(this.url + 'programas/' + idclase);
    }

    getprogramaOne(idprograma: number): Observable<any> {
        return this._http.get(this.url + 'programa-one/' + idprograma);
    }

    eliminarPrograma(idprograma: number): Observable<any> {
        return this._http.get(this.url + 'programas-delete/' + idprograma);
    }

}