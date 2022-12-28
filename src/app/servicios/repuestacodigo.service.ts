import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './url'
import { RespuestaCodigo } from '../models/Respuestacodigo';

@Injectable()
export class RespuestaCodigoService {

    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.urlApi;
    }

    create(data: RespuestaCodigo): Observable<any> {
        let params = JSON.stringify(data);
        return this._http.post(this.url + 'respuestacodigo', params);
    }

    getrespuestacodigo(idcodigo: number): Observable<any> {
        return this._http.get(this.url + 'respuestacodigo-codigo/' + idcodigo);
    }

    getrespuestacodigoporesudianteprograma(idestudiante_programas: number): Observable<any> {
        return this._http.get(this.url + 'respuestacodigo-estudianteprograma/' + idestudiante_programas);
    }

}