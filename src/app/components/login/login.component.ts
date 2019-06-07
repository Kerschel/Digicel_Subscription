import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService, TokenPayload } from '../../authentication.service';
import { Router } from '@angular/router'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  wrongpw:boolean;

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/home')
    }

    this.wrongpw=false;
  }

  credentials: TokenPayload = {
    username: "",
    password: "",
    email: "",
    name: "",
}

  constructor(private auth: AuthenticationService,private spinnerService: Ng4LoadingSpinnerService, private router: Router) { }

  login () {
    // trim all spaces from username
    this.credentials.username= this.credentials.username.replace(/\s/g, "");
      if(this.credentials.username.length==0){
        this.wrongpw=true;

      }
      else{
      this.spinnerService.show()
      this.auth.login(this.credentials).subscribe(
          (data) => {
            console.log(data)
            if(!data.error){
              // if successful
              this.router.navigateByUrl('/home')
              this.spinnerService.hide()
            }else{
              // wrong credentials was given
              this.spinnerService.hide()

              this.wrongpw=true;
            }
              
          },
          err => {
              console.error(err)
          }
      )
  }}

}
