import { Component, OnInit, Inject } from '@angular/core';
import { DbservicesService } from '../dbservices.service'
@Component({
  selector: 'app-admin1',
  templateUrl: './admin1.component.html',
  styleUrls: ['./admin1.component.css']
})
export class Admin1Component implements OnInit {
cp=1
colname="name"
ord=false
chord(col){
  this.ord=!this.ord
  this.colname=col
}

var_cat_data:object[];
  constructor(@Inject (DbservicesService) public ser) {
    this.fun_get_cat()
   }
// products=[
// {id:"1",name:"akash",price:4500,category:"Electronic",status:1},
// {id:"2",name:"vivek",price:2500,category:"shoe",status:0},
// {id:"3",name:"ashutost",price:1500,category:"shoe",status:1},
// {id:"4",name:"arsh",price:3224,category:"shoe",status:0},
// {id:"5",name:"jayant",price:4543,category:"shoe",status:1},
// {id:"6",name:"karmakr",price:3534,category:"shoe",status:1},
// {id:"7",name:"prasanta",price:5676,category:"shoe",status:0},
// {id:"8",name:"srikanta",price:1234,category:"shoe",status:1}
// ]


temp=0;
selectedData;


//to call 
funedit(seldata)
{
     //alert(seldata);
  this.temp=seldata._id;
 //alert(seldata._id)
  this.selectedData=seldata;
}




//to get data from database
fun_get_cat(){
  this.ser.serGetCat().subscribe(dt=>{
    this.var_cat_data=dt;
  })
}

funmodify(){
  var oldobj={_id:this.selectedData._id}
  var newobj={catname:this.selectedData.catname,status:this.selectedData.status}
  this.ser.serupdateCat([oldobj,newobj]).subscribe(dt=>
    {
    alert(dt.result)
    this.fun_get_cat()
    this.temp=0;
  })
}

//to insert category 

category;
  
  funinsert(){
    
    
    var obj={catname:this.category}
    this.ser.serinsertCat(obj).subscribe(dt=>{
      //alert("hi")
      this.category=""

      this.fun_get_cat()
    })
  }
  ngOnInit() { }
  





}
 