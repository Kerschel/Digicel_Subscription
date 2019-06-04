import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginrequest:any;
  constructor(private http: HttpClient) { }
  username:any;
  password:any;
  ngOnInit() {
  }

  loginAgent(event){
    event.preventDefault();
    console.log(this.username);
    const credentials = {
      "first_name":"dada",
      "last_name":"dada",
       "email":"dada",
       "contact":"dada"
    }
    this.loginrequest= this.http.post("http://127.0.0.1:5000/customer",credentials)
    console.log(this.loginrequest)
  }

}
