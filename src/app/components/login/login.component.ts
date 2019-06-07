import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService, TokenPayload } from '../../authentication.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

  credentials: TokenPayload = {
    username: "",
    password: "",
    email: "",
    name: "",
}

  constructor(private auth: AuthenticationService, private router: Router) { }

  login () {
      this.auth.login(this.credentials).subscribe(
          (data) => {
            if(!data.error)
              this.router.navigateByUrl('/home')
          },
          err => {
              console.error(err)
          }
      )
  }

}
