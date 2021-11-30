import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  authorization: string = localStorage.getItem('token') || '';

  isLogged = new Subject();

  constructor(private httpRequest: HttpClient) {}

  getToken(login: string, senha: string) {
    const url = AppConstants.baseLogin;
    const msgBody = { login: login, senha: senha };
    const headers = { 'Content-Type': 'application/json' };
    const options = { headers: headers };
    const response = this.httpRequest.post<string>(url, msgBody, options);
    return response;
  }

  setToken(token: string) {
    this.authorization = 'Bearer ' + token;
    localStorage.setItem('token', this.authorization);
    this.isLogged.next(true);
  }

  clearToken() {
    this.authorization = '';
    localStorage.removeItem('token');
    this.isLogged.next(true);
  }

  loginRequestGetToken(requestLogin: any){
    let headers: HttpHeaders = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000/');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers = headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    const response = this.httpRequest.post<string>(AppConstants.baseLogin, JSON.stringify(requestLogin), {headers: headers});
    return response;
  }
}
