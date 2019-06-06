import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from "../../models/customer";
import { Service } from "../../models/service";
import { Observable } from 'rxjs';
import { ConstantsService } from '../../common/services/constants.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customer:any;
  firstname:string;
  lastname:string;
  contact:string;
  email:string;
  searched:any;
  value:String;
  havePlan:boolean[];
  services:any;
  serviceList:any;

  
  
  constructor(private http:HttpClient,private constant: ConstantsService) {
   }
  loginrequest:any;
  ngOnInit() {

    this.getServices()
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
    this.loginrequest= this.http.post(this.constant.URL+"/customer",credentials)
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
    console.log(this.value);
    this.searched = this.http.get<Customer[]>(this.constant.URL+"/customer/"+this.value)
    
    // console.log(this.constant.LOCALURL+"/customer/"+this.value)
    // this.searched.subscribe(data=>console.log(data));

    // this.customer = this.http.get<Customer[]>(this.constant.LOCALURL+"/customer/"+this.value)
  }

  getCustomerServices(user){
    this.customer = user
    this.havePlan =new Array(this.services.length+1);
      for(var i=0;i<=this.services.length;i++){
        this.havePlan[i]=false;
      }
    this.serviceList = this.http.get(this.constant.URL+"/subscribe/"+user.id).subscribe(data=>
      { this.serviceList=data;
        console.log(this.serviceList.length)
      for(var i=0;i<=this.serviceList.length;i++){
        this.havePlan[this.serviceList[i]] = true;
        console.log("here")
      }        
      })
    
  }
  
  getServices(){
    this.http.get<Service[]>(this.constant.URL+"/services").subscribe(data => {
      this.services = data;
      this.havePlan =new Array(this.services.length+1);
      for(var i=0;i<=this.services.length;i++){
        this.havePlan[i]=false;
      }
    }) ; 
  }
  
  test(event,value,index){
    event.preventDefault();
    let subscription = {"customer_id":this.customer.id,
                        "service_id":index}
    if(value == true){
      this.loginrequest= this.http.post(this.constant.URL+"/removesubscribe",subscription)
      this.havePlan[index] = false;
      console.log(this.loginrequest)
    }
    else{
      this.loginrequest= this.http.post(this.constant.URL+"/subscribe",subscription)
      this.havePlan[index] = true;
      console.log(value,index)

    }
  }

}