import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';
import { LoginServiceService } from '../service/login-service.service';
import { Router } from '@angular/router';
// import { RequestLogin } from '../models/RequestLogin';
import { RequestService } from '../services/request.service';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  requestLogin = {login: 'letscode', senha: 'lets@123'};
  validLogin: boolean = false;
  loginForm!: FormGroup;

  // public requestLogin!: RequestLogin;

  constructor(private reqService: RequestService, private router: Router){}

  ngOnInit(): void {
    // this.requestLogin = new RequestLogin();
  }

  public onSubmit(): void {
    this.login();
  }

  public login(): void {
    this.reqService.getToken(this.requestLogin.login, this.requestLogin.senha).subscribe((token) => {
        if (token) {
          this.reqService.setToken(token);
          this.router.navigateByUrl('/cards');
          this.validLogin = false;
        } else {
          this.validLogin = true;
          this.loginForm.reset();
          this.reqService.clearToken();
        }
      });
  }

  
  // usuario = {login: '', senha: ''};
  
  // public login() {
  //   console.log("Teste login -- usuario: " + this. requestLogin.login + " senha: " + this. requestLogin.senha);
  //   this.loginService.login(this. requestLogin);
  //   this.router.navigate(['cards']);
  // }

  public clear(): void {
    this.requestLogin != undefined;
  }

  public checkToken(){

    const tokenStatus=localStorage.getItem("token")?.toString();
    console.log(tokenStatus);

    //if (localStorage.getItem("token")!=null){
    if(tokenStatus === null){
      console.log("false");
      return false;
    }else{
      console.log("true");
      return true;
    }
  }

  public isAuthenticated(): boolean {
    return Boolean(localStorage.getItem("token"))
  }

}
