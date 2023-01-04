import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Curso } from '../models/Cursos';

@Injectable()
export class CursosService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Curso): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'curso', params);
    }

    getcursos(iddocente: number): Observable<any> {
        return this._http.get(this.url + 'cursos/' + iddocente);
    }

    getcursoCount(iddocente: number): Observable<any> {
        return this._http.get(this.url + 'cursos-count/' + iddocente);
    }

    getcursoOne(idcurso: number): Observable<any> {
        return this._http.get(this.url + 'cursos-one/' + idcurso);
    }

    getcursoSearch(nombre: string): Observable<any> {
        return this._http.get(this.url + 'cursos-search/' + nombre);
    }

    deletecurso(idcurso: number): Observable<any> {
        return this._http.get(this.url + 'cursos-delete/' + idcurso);
    }

}