import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DbservicesService } from 'src/app/admin/dbservices.service';
declare var $:any;
@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {

  constructor(public rt:Router,@Inject (DbservicesService) public ser) {  }
  allProdcuctsArr;tmp:boolean=true;productdata;
  ngOnInit() {
    
    var str=localStorage.getItem("selectedproductbyuser")
    var productarr:any= [];
    this.allProdcuctsArr=str.split("**")
    if(this.allProdcuctsArr.length==0)
    this.tmp=false;
    else{
      this.tmp=true
    for(var i=0;i<this.allProdcuctsArr.length;i++)  {
      var productObj = JSON.parse(this.allProdcuctsArr[i]);
      productarr.push(productObj);
     }
     this.productdata=productarr 
     this.funFindTotal()   
  }

  
  }



// to calculate total amount of product and total price of all the product
  totAmout:number=0
  funFindTotal(){
    for(var i=0;i<this.productdata.length;i++){
      var priceOfTotalProductAmount:any=this.productdata[i].userqty*this.productdata[i].price
      //this.xyz=priceOfTotalProductAmount
      //alert(priceOfTotalProductAmount)
      this.productdata[i].prototamout=priceOfTotalProductAmount
      //alert(priceOfTotalProductAmount)
      this.totAmout+=priceOfTotalProductAmount
      alert(this.totAmout)
    }
}

// click on proceed to pay button this function will work 
funProceedToPay(){

  alert("hallo proceed to pay")
  if(localStorage.getItem("aut")){
    this.rt.navigateByUrl("user/bill")
  }
  else{
    $("#myModal1").modal("show")
  }
  
 
}
// to click on delete button this function will work
funCartItemRemove(pid){
  this.productdata = this.productdata.filter(function( obj ) {
    return obj.pid != pid;
   });
 
 if(this.productdata.length==0)
    this.tmp=false
   var str=JSON.stringify(this.productdata).split("},").join("}**")
str=str.split("[").join("").split("]").join("")
localStorage.setItem("selectedproductbyuser",str)
this.totAmout=0
this.funFindTotal()
}

// call this function when quantity and total amount we have to
funUpdateQty(pid,conid){
if(localStorage.getItem("aut")){
  var cid="txt"+conid
  var cont=<HTMLInputElement>document.getElementById(cid)
  var quantity:number = parseInt(cont.value)
  var ob=[{_id:pid,identity:localStorage.getItem("fn")},{$set:{quantity:quantity}}]
  this.ser.serUpdateProductInDB(ob).subscribe(dt=>{
    this.fungetProductDataAfterLogin()

  })
}
}
// fun to get data after login 
fungetProductDataAfterLogin(){
  this.ser.serToGetCatDataFromDb().subscribe(dt=>{
    this.productdata=dt;
    
  })
}

}

