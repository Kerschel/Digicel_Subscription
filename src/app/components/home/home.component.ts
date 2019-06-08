import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from "../../models/customer";
import { Service } from "../../models/service";
import { ConstantsService } from '../../common/services/constants.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from "../modal/modal.component"
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'
@Component({
  providers:[ModalComponent ],
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
  populated:boolean;
  value:String;
  havePlan:boolean[];
  services:any;
  serviceList:any;
  wait:boolean;

  
  
  constructor(private http:HttpClient,private sweet:SweetAlert2Module, private spinnerService: Ng4LoadingSpinnerService,private constant: ConstantsService,private router: Router,private modal:ModalComponent) {
   }
  loginrequest:any;
  ngOnInit() {
  
     

    this.customer = {
      "firstname": "",
      "lastlame": "",
      "email": "",
      "contact": "",
      "id": ""

    };
    this.wait=false;
    this.getServices()
  }

stuff(){
  
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
    Swal.fire(
      'Created!',
      'Customer created',
      'success'
    )
    // this.beginTimer()
    // this.loginrequest= this.http.post(this.constant.LOCALURL+"/customer",credentials)
    
  }

  editCustomer(event){
    event.preventDefault();
    const credentials = {
      "id":this.customer.id,
      "first_name":this.customer.firstname,
      "last_name":this.customer.lastname,
      "contact":this.customer.contact,
      "email":this.customer.email
    }
    this.loginrequest= this.http.post(this.constant.URL+"/customer/edit",credentials)
    this.loginrequest.subscribe(data=>{
      this.searchCustomer()
    })
    // this.loginrequest= this.http.post(this.constant.LOCALURL+"/customer",credentials)
    
  }

  selectCustomer(person){
    // save customer information
    this.customer.id=person.id;
    this.customer.firstname=person.firstname;
    this.customer.lastname=person.lastname;
    this.customer.contact=person.contact;
    this.customer.email=person.email;
  }
  clearFields(){
    this.firstname="";
    this.lastname="";
    this.email="";
    this.contact="";
  }

  searchCustomer(){
    // show the waiting icon
    this.spinnerService.show();
    this.http.get<Customer[]>(this.constant.URL+"/customer/"+this.value).subscribe(data => {
      this.searched = data;
      if(this.searched.length >0)
        this.populated = true;
      this.spinnerService.hide()})
  }

  getCustomerServices(user){
    // send data for subscription
    this.router.navigate(['/subscriptions',user.id]);
  }
  
  beginTimer(){
    this.wait = true;
    setTimeout(() => 
    {
        this.wait = false;
    },
    3000);
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
  
  



}