import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Estudianterespuestapuzzle } from '../models/Estudianterespuestapuzzle';

@Injectable()
export class EstudianteRespuestaPuzzleService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Estudianterespuestapuzzle): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'estudianterespuestapuzzle', params);
    }

    getporpuzzle(idpuzzle: number): Observable<any> {
        return this._http.get(this.url + 'estudianterespuestapuzzle-puzzle/' + idpuzzle);
    }

    getporestudiante(idestudiante: number): Observable<any> {
        return this._http.get(this.url + 'estudianterespuestapuzzle-estudiante/' + idestudiante);
    }
}