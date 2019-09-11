import { Component, OnInit, Inject } from '@angular/core';
import { DbservicesService } from '../dbservices.service';
import { serverhost } from '../../../../settings'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  varServerHost
  constructor(@Inject (DbservicesService) public ser,public ra:ActivatedRoute)
   {
    this.varServerHost=serverhost
    this.ra.params.subscribe(dt=>{
      if(dt.status){
        if(dt.status==1){
          alert("product inserted")
        }
        else
        alert(dt.status)
      }
    })
    this.ser.serGetCat().subscribe(dt=>{ 
      this.catdata=dt  })

      this.funGetProduct()

    }
  catdata:Object[];
  // subcatdata:Object[];
  // subsubcatdata:Object[];
  // subdata:Object[];
  // drpCat:string;
  // drpSubCat:string;
  varSubsubcatData:Object[];
  varSubcatData:Object[];
  ngOnInit() {
    
    

      // this.ser.serGetSubCat().subscribe(dt=>{
      //   this.subcatdata=dt
      // })
    }
      // get subcategory data in specific subcategory name 
      funGetSubCat()
      {
        
        this.ser.serGetSubCat_catId({catid:parseInt(this.drpCat)}).subscribe(dt=>
          {
          this.varSubcatData=dt;
          
        })
      }
  
      drpCat:string;
      drpSubCat:string;
      drpsubsubcat:string;
      drpSubSubCat:string;
  //     this.ser.serGetSubSubCat().subscribe(dt=>{
  //       this.subsubcatdata=dt
  //     })
     // get subsubcategory data in specific subsubcategory name
  funGetSubSubCat(){
    this.ser.serGetSubSubCat_subcatId({subcatid:parseInt(this.drpSubCat)}).subscribe(dt=>{
     // alert("hiii")
      this.varSubsubcatData=dt
     // alert(dt)
    })
  }



  // to fetch products from database
  productdata:Object[]
  funGetProduct(){
    this.ser.serGetProduct().subscribe(dt=>{
      this.productdata=dt
    })
  }



  // to insert alll product details from front-end
  p_name;newp_price;oldp_price;p_type;p_brand;p_color;p_rating;quantity;subsubcatname;offers;discount
  funInsertProduct(){
    var obj={p_name:this.p_name,
      newp_price:this.newp_price,
      oldp_price:this.oldp_price,
      p_brand:this.p_brand,
      p_type:this.p_type,
      p_color:this.p_color,
      p_rating:this.p_rating,
      offers:this.offers,
      discount:this.discount,
    quantity:this.quantity,
    catid:parseInt(this.drpCat),
  subcatid:parseInt(this.drpSubCat),
subsubcatid:parseInt(this.drpsubsubcat)}
this.ser.serInsurtProduct(obj).subscribe(dt=>{
  alert("hallo product")
  var formref=<HTMLFormElement>document.getElementById("frm1")
  formref.submit()
  this.funGetProduct()
})
  }


  //to call the edit button
  temp=0;selectedData

  funEditProduct(seldata){
      this.temp=seldata._id
      this.selectedData=seldata
  }




  // to update the product data
  _id
  funUpdateProduct(){
    var oldobj={_id:this._id}
    var newobj={$set:{p_name:this.p_name,
                     p_color:this.p_color,
                     p_type:this.p_type,
                     p_rating:this.p_rating,
                     quantity:this.quantity,
                     offers:this.offers,
                     discount:this.discount,
                     newp_price:this.newp_price,
                     oldp_price:this.oldp_price,
                     p_brand:this.p_brand,
                     catid:parseInt(this.drpCat),
                     subcatid:parseInt(this.drpSubCat),
                     subsubcatid:parseInt(this.drpsubsubcat)}}


                     this.ser.serProductUpdate([oldobj,newobj]).subscribe(dt=>{
                       alert("update success")
                       this.funGetProduct()
                     })
  }

}
