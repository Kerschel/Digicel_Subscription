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

  ngOnInit() {
  }

  credentials: TokenPayload = {
    username: "",
    password: "",
    email: "",
    name: "",
}

  constructor(private auth: AuthenticationService,private spinnerService: Ng4LoadingSpinnerService, private router: Router) { }

  login () {
      this.spinnerService.show()
      this.auth.login(this.credentials).subscribe(
          (data) => {
            if(!data.error){
              this.router.navigateByUrl('/home')
              this.spinnerService.hide()
            }else{
              this.spinnerService.hide()
            }
              
          },
          err => {
              console.error(err)
          }
      )
  }

}
