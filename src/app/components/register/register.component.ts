import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../authentication.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    username: "",
    password: "",
    email: "",
    name: "",
}
constructor(private auth: AuthenticationService, private router: Router){}

  ngOnInit() {
    Swal.fire(
      'Registered!',
      'Account created',
      'success'
    )
  }
  register () {
    // register only if user entered username and password
      if(this.credentials.username.length>0 && this.credentials.password.length>0){
        
        this.auth.register(this.credentials).subscribe(
          () => {
              this.router.navigateByUrl('/login')
          },
          err => {
            // failed to connect to server
              console.error(err)
          }
      )
    }
}

}
