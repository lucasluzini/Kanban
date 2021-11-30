import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  authorization: string = localStorage.getItem('token') || '';
  headers = {
    'Content-Type': 'application/json',
    Authorization: this.authorization,
  };

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

  
}
