import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) {}

  login(requestLogin: any){
    //console.info(JSON.stringify(usuario))

    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000/');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers = headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //console.log({headers: headers});

    return this.http.post(AppConstants.baseLogin, JSON.stringify(requestLogin), {headers: headers}).subscribe(data => {
      // Retorno Http
      //console.info(JSON.parse(JSON.stringify(data)));
      const token = JSON.parse(JSON.stringify(data));
      //console.info(JSON.parse(JSON.stringify(data)));
      //console.log(token);
      localStorage.setItem("token", token);

      console.info("Token: " + localStorage.getItem("token"));
    },
      error => {
        console.error("Erro ao tentar a autenticação" + error);
      });

  }

}
