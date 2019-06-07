import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Service } from "../../models/service";
import { ConstantsService } from '../../common/services/constants.service'
import { ModalComponent } from "../modal/modal.component"
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  providers:[ModalComponent ],

  selector: 'app-subsription',
  templateUrl: './subsription.component.html',
  styleUrls: ['./subsription.component.css']
})
export class SubsriptionComponent implements OnInit {
  user:any;
  havePlan:boolean[];
  services:any;
  serviceList:any;
  userid:any;
  action:any;
  index:any;
  history:any;
  value:any;
  nohistory:any;

  constructor(private route: ActivatedRoute,  private spinnerService: Ng4LoadingSpinnerService,private modal:ModalComponent,private router: Router, private http: HttpClient,private constant: ConstantsService) { }

  ngOnInit() {
    this.user={
      "firstname":"",
      "contact":""
    }
    this.nohistory = false;

    this.spinnerService.show();
    this.getServices();
  }

    // this function gets all services to be shown on the table 
    // it also sets the array size for the boolean array  for the number of possible plans
  getServices(){
    this.http.get<Service[]>(this.constant.URL+"/services").subscribe(data => {
      this.services = data;
    console.log(this.services.length)

      this.havePlan =new Array(this.services.length+1);
      for(var i=0;i<=this.services.length;i++){
        this.havePlan[i]=false;
      }
    this.populateParams();

    }) ; 
  }

// gets the list of deactivated plans for the customer
  getHistory(){
    this.spinnerService.show();
    this.http.get(this.constant.URL+"/recentsubscriptions/"+this.userid).subscribe(data => {
      this.history=data
      if(this.history.length == 0){
        this.nohistory = true;
      }
      this.spinnerService.hide();
    });
  }

// checks to see all the subscribed packages and shows them
  populateParams(){
    this.route.params.subscribe(req => {
      this.userid = req['id'];
      this.havePlan =new Array(this.services.length+1);
        for(var i=0;i<=this.services.length;i++){
          this.havePlan[i]=false;
        }
      this.serviceList = this.http.get(this.constant.URL+"/subscribe/"+this.userid).subscribe(data=>
        { this.serviceList=data;
          console.log(this.serviceList)
        for(var i=0;i<=this.serviceList.length;i++){
          this.havePlan[this.serviceList[i]] = true;
        }        
        })
      let request= this.http.get(this.constant.URL+"/customer/byId/"+this.userid).subscribe(data=>
        {this.user=data
          this.spinnerService.hide();
        })
      
    })
  }

  confirmation(event,template,index,value){
    event.preventDefault();
    console.log(index,value)
    this.value=value
    this.index =index
    this.modal.openModal(template)
    
  }
// decides if to add or remove subscription package
  confirm(){
    let subscription = {"customer_id":this.userid,
                        "service_id":this.index}
    if(this.value == true){
      this.action= this.http.post(this.constant.URL+"/removesubscribe",subscription)
      this.nohistory = false;

      this.havePlan[this.index] = false;
      console.log(this.action)
    }
    else{
      this.action= this.http.post(this.constant.URL+"/subscribe",subscription)
      this.havePlan[this.index] = true;

    }
    this.modal.close();
  }
  
  decline(){
    this.modal.close();
  }
}
