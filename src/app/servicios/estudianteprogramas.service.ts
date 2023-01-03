import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { EstudianteProgramas } from '../models/Estudiantesprogramas';

@Injectable()
export class EstudianteProgramasService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: EstudianteProgramas): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'estudianteprograma', params);
    }

    getestudianteprograma(idprograma: number): Observable<any> {
        return this._http.get(this.url + 'estudianteprograma-programa/' + idprograma);
    }

    getestudianteprogramaIdestudiante(idestudiante: number): Observable<any> {
        return this._http.get(this.url + 'estudianteprograma-estudiante/' + idestudiante);
    }
}