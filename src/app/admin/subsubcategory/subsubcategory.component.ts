
import { Component, OnInit, Inject } from '@angular/core';
import { DbservicesService } from '../dbservices.service';

@Component({
  selector: 'app-subsubcategory',
  templateUrl: './subsubcategory.component.html',
  styleUrls: ['./subsubcategory.component.css']
})
export class SubsubcategoryComponent implements OnInit {
   subcatdata:Object[];
   subdata:Object[];
   catdata:Object[];
   varSubcatData:Object[];
   drpCat:string;
   categorydata:Object[];
  constructor(@Inject (DbservicesService) public ser)
   {
    this.ser.serGetCat().subscribe(dt=>
      {
      this.catdata=dt
      })

      // this is for normal dropdown for getting subcategory name
      // this.ser.serGetSubCat().subscribe(dt=>{
      //   this.subcatdata=dt
      // })
  
      this.funsubsubdata()
   }

   //to get the subsub category data
   subsubdata:Object[];
   funsubsubdata(){
     this.ser.serGetSubSubCat().subscribe(dt=>{
       this.subsubdata=dt
    
     })
   }
   // to get sub sub data based on id
   


   // to insert sub sub category data
   txtsubsubcat:string;
   drpcat:string;
   drpsubcat:string;
   obj:object[];
   varsubcatData:Object[];
   funinsertsubsubdata()
   {
     
     var obj={subsubcatname:this.txtsubsubcat,catid:parseInt(this.drpcat),subcatid:parseInt(this.drpsubcat),status:1};
     alert(obj)
     this.ser.sersubsubinsert(obj).subscribe(dt=>
      {
       alert(dt.result)
       this.funsubsubdata()
     })
   }

   //to edit the data

   
   selectdata;
  temp=0;
  funedit(seldata){
    this.temp=seldata._id
    this.selectdata=seldata
  }



  //to get sub cat data based oncatid for table drop down

  funGetSubCat()
      {
        this.ser.serGetSubCat_catId({catid:parseInt(this.drpCat)}).subscribe(dt=>{
          this.varSubcatData=dt;
          })
      }


//to get sub cat data based oncatid for up side drop down
      funGetsubCat()
      {
        this.ser.serGetSubCat_catId({catid:parseInt(this.drpcat)}).subscribe(dt=>{
          this.varsubcatData=dt;
          })
      }


       //to call the update function on save button
       txtsubsub;drpSubCat;dropeditstatus
funcupdate(){


    var oldobj={_id:this.selectdata._id}
    var newobj={$set:{"subcatname":this.txtsubsub,
      catid:parseInt(this.drpCat),
      subcatid:parseInt(this.drpSubCat),
      status:parseInt(this.dropeditstatus)}}
    this.ser.serupdatesubsubCat([oldobj,newobj]).subscribe(dt=>{
      alert(dt.result)
      this.funsubsubdata()
    
    })
  }

  
  
 

  ngOnInit() {
    this.ser.serGetCat().subscribe(dt=>
      {
      this.categorydata=dt
      })
  }

}
