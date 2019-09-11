import { Component, OnInit, Inject } from '@angular/core';
import { DbservicesService } from '../dbservices.service';

@Component({
  selector: 'app-admin2',
  templateUrl: './admin2.component.html',
  styleUrls: ['./admin2.component.css']
})
export class Admin2Component implements OnInit {
catdata:Object[];
  constructor(@Inject (DbservicesService) public ser) {
    this.ser.serGetCat().subscribe(dt=>{
      this.catdata=dt
    })
     this.fungetsubcat()}
  cp=1
  colname="name"
  ord=false
  chord(col){
    this.ord=!this.ord
    this.colname=col
  }


  //to fetch data from sub category
 

  subdata:Object[];
    fungetsubcat(){
      this.ser.serGetSubCat().subscribe(dt=>{
        this.subdata=dt
      })
}

// to call the edit button 


  selectdata;
  temp=0;
  funedit(seldata){
    this.temp=seldata._id
    this.selectdata=seldata
  }
  


  //to call the update function on save button

  funmodify(){


    var oldobj={_id:this.selectdata._id}
    var newobj={$set:{"subcatname":this.selectdata.subcatname,
      catid:parseInt(this.selectdata.catid),
      status:parseInt(this.selectdata.status)}}
    this.ser.serupdatesubcat([oldobj,newobj]).subscribe(dt=>{
      alert(dt.result)
      this.fungetsubcat()
    
    })
  }

  //to insert the subcst data
  txtsubcat:string;
  drpcat:string;
  funinsert(){
    var obj={subcatname:this.txtsubcat,catid:parseInt(this.drpcat),status:1}
    this.ser.serinsertsubcat(obj).subscribe(dt=>{
      console.log("I am from comp ")
         alert(dt.result)
         this.fungetsubcat()
         this.txtsubcat=""
         this.drpcat=""
    })
  }



  ngOnInit() {
  }

}


