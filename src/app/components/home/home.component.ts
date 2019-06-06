import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from "../../models/customer";
import { Observable } from 'rxjs';
import { ConstantsService } from '../../common/services/constants.service'

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
  value:String;

  constructor(private http:HttpClient,private constant: ConstantsService) {
   }
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
    this.loginrequest= this.http.post(this.constant.ROOTURL+"/customer",credentials)
    // this.loginrequest= this.http.post(this.constant.LOCALURL+"/customer",credentials)
    console.log(this.loginrequest);
    
  }

  clearFields(){
    this.firstname="";
    this.lastname="";
    this.email="";
    this.contact="";
  }

  searchCustomer(){
    // this.value = this.value.replace(" ","_");
    // this.searched = this.http.get("https://jsonplaceholder.typicode.com/todos/1")
    // console.log(this.value);
    this.searched = this.http.get<Customer[]>(this.constant.LOCALURL+"/customer/"+this.value)
    // console.log(this.constant.LOCALURL+"/customer/"+this.value)
    this.searched.subscribe(data=>console.log(data));

    // this.customer = this.http.get<Customer[]>(this.constant.LOCALURL+"/customer/"+this.value)
  }

  


}
