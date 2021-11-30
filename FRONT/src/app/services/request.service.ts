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

  cardsChanged = new Subject();
  isLogged = new Subject();


  constructor(private httpClient: HttpClient) {}

  getAuthorizationToken(login: string, senha: string) {
    const url = AppConstants.baseLogin;
    const msgBody = { login: login, senha: senha };
    const headers = { 'Content-Type': 'application/json' };
    const options = { headers: headers };
    const response = this.httpClient.post<string>(url, msgBody, options);
    return response;
  }

  setAuth(token: string) {
    this.authorization = 'Bearer ' + token;
    localStorage.setItem('token', this.authorization);
    this.isLogged.next(true);
  }

  clearAuth() {
    this.authorization = '';
    localStorage.removeItem('token');
    this.isLogged.next(true);
  }

  
}
