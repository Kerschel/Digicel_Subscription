import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from "../../models/customer";
import { Service } from "../../models/service";
import { ConstantsService } from '../../common/services/constants.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from "../modal/modal.component"
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


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

  
  
  constructor(private http:HttpClient, private spinnerService: Ng4LoadingSpinnerService,private constant: ConstantsService,private router: Router,private modal:ModalComponent) {
   }
  loginrequest:any;
  ngOnInit() {
    this.populated = false;
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
    this.spinnerService.show();

    this.http.get<Customer[]>(this.constant.URL+"/customer/"+this.value).subscribe(data => {
      this.searched = data;
      if(this.searched.length >0)
        this.populated = true;
      console.log(data);
      this.spinnerService.hide()})
  }

  getCustomerServices(user){
    this.router.navigate(['/subscriptions',user.id]);
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