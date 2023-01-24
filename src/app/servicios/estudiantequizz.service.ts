import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Estudiantequizz } from '../models/Estudiantequizz';

@Injectable()
export class EstudianteQuizzService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Estudiantequizz): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'estudiantequizz', params);
    }

    getestudiantequizz(idquizz: number): Observable<any> {
        return this._http.get(this.url + 'estudiantequizz-quizz/' + idquizz);
    }

    getestudianteprogramaIdestudiante(idestudiante: number): Observable<any> {
        return this._http.get(this.url + 'estudiantequizz-estudiante/' + idestudiante);
    }
}