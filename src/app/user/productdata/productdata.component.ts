import { Component, OnInit,Inject } from '@angular/core';
import { DbservicesService } from 'src/app/admin/dbservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdincService } from 'src/app/prodinc.service';

@Component({
  selector: 'app-productdata',
  templateUrl: './productdata.component.html',
  styleUrls: ['./productdata.component.css']
})
export class ProductdataComponent implements OnInit {
  productdata1
  varproductid;bigimg;tot_cart_items:number;

  constructor(@Inject(DbservicesService) public ser,@Inject(ActivatedRoute) public ar, public rt:Router, public prodcount:ProdincService) {
     this.ar.params.subscribe(dt=>{
     this.varproductid=dt._id;
     alert( this.varproductid)
     this.getproductid1()
     })
    
   }
     


  ngOnInit() {this.funaddtocart()}
  getproductid1(){
    var obj={_id:parseInt(this.varproductid)}
    this.ser.getproductid(obj).subscribe(dt=>{
    this.productdata1=dt
    this.bigimg=this.productdata1[0].images[0]
     })

  }

  //for big image come from selected three images
  funimage(inm)
  {
    this.bigimg=inm
  }



  
  // to call the ADD TO CART BUTTON 
  qtyuser:number=1;
  funaddtocart(){
    alert("hallo")
    alert(this.qtyuser)
    var obj={pid:this.productdata1[0]._id,pname:this.productdata1[0].p_name,price:this.productdata1[0].newp_price
    ,userqty:this.qtyuser,image:this.productdata1[0].images,aqty:this.productdata1[0].quantity}
    //alert(obj.pname)
    if(localStorage.getItem("selectedproductbyuser"))
{
var localdata=localStorage.getItem("selectedproductbyuser")
localdata=localdata+"**"
localdata=localdata+JSON.stringify(obj)
localStorage.setItem("selectedproductbyuser",localdata)
}
else{
    localStorage.setItem("selectedproductbyuser",JSON.stringify(obj))
    //when data going in local storage then we have to convert JSON DATA to string
}
this.prodcount.current_value.subscribe(dt=>{
  this.tot_cart_items=parseInt(dt)
})
this.prodcount.funnext(this.tot_cart_items)
this.rt.navigateByUrl("user/viewcart")
  }

}

