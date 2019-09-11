import { Component, OnInit,Inject } from '@angular/core';
import { DbservicesService } from 'src/app/admin/dbservices.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  usercartdata:Object[]
  tot_pro_price:number=0;
  msgTotal:number
  UserDetails
  constructor(@Inject (DbservicesService) public ser) {
    this.ser.getUserDetailsForBilling({fname:localStorage.getItem("fn")}).subscribe(dt=>{
      this.UserDetails=dt
    })
    
    this.ser.serFetchUserCartData().subscribe(dt=>{
      this.usercartdata=dt
       var prev=0
       this.msgTotal = this.usercartdata.reduce((prev:any, cur:any)=> {
        var x=parseInt(cur.userqty)
        var oneproductprice=cur.newprice*cur.userqty
        this.tot_pro_price+=oneproductprice
        return prev + x;
      }, 0);    
     //alert(this.msgTotal)
     //alert(this.tot_pro_price)
    })
   }



  ngOnInit() {}
  fname;address;email;mobile
payment(){
  var obj:any={
    uname:this.UserDetails[0].fname,
    address:this.UserDetails[0].address,
    email:this.UserDetails[0].email,
    mobileno:this.UserDetails[0].mobile
  }
  localStorage.setItem("shoppingInfo",JSON.stringify(obj))
  alert("hallo")
  this.ser.serPayment(obj).subscribe(dt=>{
  window.location.href=dt.payment_request.longurl
  alert(dt)
  })
}


}
