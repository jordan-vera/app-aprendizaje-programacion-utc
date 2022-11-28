import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioLoginService } from './servicios/usuariologin.service';
import { DocenteService } from './servicios/docente.service';
import { CursosService } from './servicios/cursos.service';
import {NgxImageCompressService} from "ngx-image-compress";
import { ClaseService } from './servicios/clases.service';
import { ProgramaService } from './servicios/programa.service';
import { CodigoService } from './servicios/codigo.service';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { QuizzService } from './servicios/quizz.service';
import { RespuestaquizzService } from './servicios/respuestaquizz.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UsuarioLoginService,
    DocenteService,
    CursosService,
    NgxImageCompressService,
    ClaseService,
    ProgramaService,
    CodigoService,
    QuizzService,
    RespuestaquizzService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
