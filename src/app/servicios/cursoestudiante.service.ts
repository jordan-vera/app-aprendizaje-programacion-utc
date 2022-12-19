import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Cursoestudiante } from '../models/Cursoestudiante';

@Injectable()
export class CursoEstudianteService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Cursoestudiante): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'cursoestudiante', params);
    }

    getcursoestudiante(idestudiante: number, idcurso: number): Observable<any> {
        return this._http.get(this.url + 'cursoestudiante/' + idestudiante + '/' + idcurso);
    }

    getestudiantesporcurso(idcurso: number): Observable<any> {
        return this._http.get(this.url + 'cursoestudiante-por-curso/' + idcurso);
    }

    cambiarestado(data: Cursoestudiante): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'cambiar-estado-estudiante-curso', params);
    }

}