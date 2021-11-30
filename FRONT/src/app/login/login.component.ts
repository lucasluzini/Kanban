import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../services/request.service';


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

  constructor(private reqService: RequestService, private router: Router){}

  ngOnInit(): void { 

  }

  public onSubmit(): void {
    this.login();
  }

  public login(): void {
    this.reqService.loginRequestGetToken(this. requestLogin).subscribe((token) => {
        if (token) {
          this.reqService.setToken(token);
          this.router.navigateByUrl('/cards');
          this.validLogin = false;
        } else {
          this.validLogin = true;
          this.reqService.clearToken();
        }
      });
  }

  public isAuthenticated(): boolean {
    return Boolean(localStorage.getItem("token"))
  }

}
