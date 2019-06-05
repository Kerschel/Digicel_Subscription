import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from "../../models/customer";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  services = ["Post Paid 1 - $200.00","Post Paid 1 - $200.00","Post Paid 1 - $200.00","Post Paid 1 - $200.00"];
  customer:Observable<Customer[]>;
  firstname:string;
  lastname:string;
  contact:string;
  email:string;
  searched:any;
  constructor(private http:HttpClient) { }
  loginrequest:any;
  ngOnInit() {

  }

  createCustomer(event){
    event.preventDefault();
    console.log(this.firstname)
    const credentials = {
      "first_name":this.firstname,
      "last_name":this.lastname,
      "contact":this.contact,
      "email":this.email
       
    }
    this.loginrequest= this.http.post("http://127.0.0.1:5000/customer",credentials)
    console.log(this.loginrequest);
    this.clearFields();
    
  }

  clearFields(){
    this.firstname="";
    this.lastname="";
    this.email="";
    this.contact="";
  }

  searchCustomer(){
    this.searched = this.http.get<Customer[]>("http://35.233.209.172/customer/Kerschel")
    // this.searched.subscribe(data=>console.log(data));
  }


}
