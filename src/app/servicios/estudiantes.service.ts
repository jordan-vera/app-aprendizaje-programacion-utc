import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Estudiante } from '../models/Estudiante';

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

    getOneEstudiante(idestudiante: number): Observable<any> {
        return this._http.get(this.url + 'estudiante-one/' + idestudiante);
    }

    getCountPorDocente(iddocente: string): Observable<any> {
        return this._http.get(this.url + 'estudiante-count-docente/' + iddocente);
    }

    update(data: Estudiante): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'estudiante-update', params);
    }
}