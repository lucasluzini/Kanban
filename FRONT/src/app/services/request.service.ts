import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  authorization: string = localStorage.getItem('auth') || '';
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

  setAuth(auth: string) {
    this.authorization = 'Bearer ' + auth;
    localStorage.setItem('auth', this.authorization);
    this.isLogged.next(true);
  }

  clearAuth() {
    this.authorization = '';
    localStorage.removeItem('auth');
    this.isLogged.next(true);
  }

  
}
