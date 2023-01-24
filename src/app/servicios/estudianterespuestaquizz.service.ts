import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { Estudianterespuestaquizz } from '../models/Estudianterespuestaquizz';

@Injectable()
export class EstudianteRespuestaQuizzService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: Estudianterespuestaquizz): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'estudianterespuestaquizz', params);
    }

    getporestudiantequizz(idestudiantequizz: number): Observable<any> {
        return this._http.get(this.url + 'estudianterespuestaquizz-estudiantequizz/' + idestudiantequizz);
    }

    getestudianteprogramaIdestudiante(idrespuestaquizz: number): Observable<any> {
        return this._http.get(this.url + 'estudianterespuestaquizz-respuestaquizz/' + idrespuestaquizz);
    }
}