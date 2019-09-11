import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsComponent } from './products/products.component';
//import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DbservicesService {

  constructor(@Inject (HttpClient) public ht) { }
  serGetCat():object[]
  {
    return this.ht.get("catref/getcat")
  }


  serupdateCat(obj:Object):Observable<Object>{
          return this.ht.post("catref/update",obj)
  }

  // to insert category
  serinsertCat(obj:Object):Observable<Object>{
    
    return this.ht.post("catref/insert",obj)
  }

  //to fetch data from subcategory
  serGetSubCat():object[]{
    
    return this.ht.get("subcatref/getsubcat")
  }



  // to update sub category data
  serupdatesubcat(obj:Object):Observable<Object>{
    return this.ht.post("subcatref/updatesubcat",obj)
  }

  //to insert sub category daTA 
  serinsertsubcat(obj:Object):Observable<Object>{
    return this.ht.post("subcatref/inssubcat", obj)
  }

  //to get the sub sub category data
  serGetSubSubCat():object[]{
    return this.ht.get("subsubcatref/getsubsubcat")
  }




  // to inser sub sub category
  sersubsubinsert(obj:Object):Observable<Object>
  {
    return this.ht.post("subsubcatref/subsubinsert",obj)
  }

  

  // To get subcat based on cat id
serGetSubCat_catId(obj){
  
  return this.ht.post("subcatref/getsubcatbasedoncatid",obj)
}


// To get subcat based on subcat id

serGetSubSubCat_subcatId(obj){
  //alert("Ser ex")
  return this.ht.post("subsubcatref/getsubsubcatbasedonsubcatid",obj)

}


// to update the sub sub category
serupdatesubsubCat(obj):Object[]{
  return this.ht.post("subsubcatref/updsubsubcat",obj)
}


//to call data from product database fetch Products
serGetProduct(){
  return this.ht.get("productref/getproduct")
}



//to call the insert function in products
serInsurtProduct(obj){
  return this.ht.post("productref/insertproduct",obj)
}

// to update products 
serProductUpdate(obj){
  return this.ht.post("productref/updateproduct",obj)
}
//Getsubsubcatid
getsubsubcatid(obj){
  return this.ht.post("productref/getsubsubcatid",obj)
}
//getproductid
getproductid(obj){
  return this.ht.post("productref/getproductid",obj)
}



//to insert from front-end in registration field

insurtReg(obj){
  return this.ht.post("registrationref/insertregistration",obj)
}

// for login porpose

LoginSer(ob){
  return this.ht.post("registrationref/login",ob)
  }


  //Account activation
accountActivateService(obj){
  return this.ht.post("registrationref/activation",obj)

}


// to store product details from localstorage to database
serStoreCartData(obj){
  
  return this.ht.post("paymentref/storecartdata",obj)
}


//// to fetching the all data which is selected by authenticated user in biill component based on identity
serFetchUserCartData(){
  var obj={identity:localStorage.getItem("fn")}
  return this.ht.post("paymentref/fetchuserdata",obj)
}

 // to get the login details like username,emaidid address,mobileno, after fetching the user cart details in bill page
 getUserDetailsForBilling(ob){
  return this.ht.post("registrationref/getUserLoginDetails",ob)
}
// TO CALL THE Payment API from payment.js page
serPayment(obj){
  return this.ht.post("paymentref/payment",obj)
}

////to fetch data in myaacount page
serFetchInMyAccount(obj){
  return this.ht.post("registrationref/myaccoubntfetchdata",obj)
}


// to get productdata when we are searching in header components
serSearchProduct(){
  return this.ht.get("productref/getsearchproduct")
}



}
