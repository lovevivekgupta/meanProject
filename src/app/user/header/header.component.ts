import { Component, OnInit, Inject } from '@angular/core';
import { DbservicesService } from 'src/app/admin/dbservices.service';
import { ProdincService } from 'src/app/prodinc.service';
import { ViewcartComponent } from '../viewcart/viewcart.component';
declare var $:any
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  tot_cart_items:number;catdatadropdown
  constructor(@Inject (DbservicesService) public ser, public prodcount:ProdincService) { 
    this.prodcount.current_value.subscribe(dt=>{
      this.tot_cart_items=parseInt(dt)
      //this.funSearch()
    })

    this.ser.serGetCat().subscribe(dt=>{
    this.catdatadropdown=dt
    })
  
  }

  //to insurt from front-end in registration section 
  fn;ln;gender;mobile;email;password;address
  funInsertReg(fref){
    var obj={fname:this.fn,lname:this.ln,gender:this.gender,mobile:this.mobile,email:this.email,password:this.password,address:this.address,active:0}
    this.ser.insurtReg(obj).subscribe(dt=>{
      $("#myModal").modal("hide")
    })
  }


  tmp:boolean=true
  fun_hide_afterlogin(){
this.tmp=false
  }




  varLoginPwd;varLoginEmail;com_str
  funLogin(){
    var obj={email:this.varLoginEmail,password:this.varLoginPwd}
    console.log(obj)
    this.ser.LoginSer(obj).subscribe(dt=>{
     // console.log(dt.res)
      if(dt.res.length==1)
      {
        // if(dt.res[0].active==0){
        //   alert("hallo")
        //   this.com_str="your account is not activated"
        //   $("#afteregdiv").modal("show")
        // }
        localStorage.setItem("aut",'1')
        localStorage.setItem("fn",dt.res[0].fname)
        this.fn=dt.res[0].fname
         $("#myModal1").modal("hide")
         this.fun_hide_afterlogin()
         var str=localStorage.getItem("selectedproductbyuser")
         var arr:any[]=str.split("**")
         var newproarr=[]
         for(var i=0;i<arr.length;i++)
         {
           var obj=JSON.parse(arr[i])
           obj.identity=localStorage.getItem("fn")
           newproarr.push(obj)
         }
         this.ser.serStoreCartData(newproarr).subscribe(dt=>{
          var url=document.URL
          alert(url)
          var arr=url.split("/")
          if(arr[4]=="viewcart")
          {
           window.location.href="http://localhost:4200/user/viewcart"
          }
         })
        
      }
      else
      {
        $("#myModal1").modal("hide")
        this.com_str="Invalid email/password"
        $("#aftregdiv").modal("show")
        
      }
    })
  }
  funLmwC(){
    $("#myModal1").modal("show")
  }

  ngOnInit() {
    if(localStorage.getItem("aut"))
    {
      this.fn=localStorage.getItem("fn")
    this.tmp=false;
    }
    else
    {
    this.tmp=true;  
    }
  }


  // to work on search product funtionality
  searchdata;txtsearch
  funSearch(){
    //var obj={p_name:{$regex:this.txtsearch}}
    this.ser.serSearchProduct().subscribe(dt=>{
      this.searchdata=dt
    })
  }

}
