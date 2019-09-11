import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import {MatRadioModule} from '@angular/material/radio';

import { RouterModule,Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { BannerComponent } from './banner/banner.component';
import { SectionComponent } from './section/section.component';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { ProductdataComponent } from './productdata/productdata.component';
import { UsercommonComponent } from './usercommon/usercommon.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AccountactivationComponent } from './accountactivation/accountactivation.component';
import { LogoutComponent } from './logout/logout.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { BillComponent } from './bill/bill.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { PaymentdoneComponent } from './paymentdone/paymentdone.component'
import { ImageZoomModule } from 'angular2-image-zoom';
var objuser:Routes=[{path:"",component:UsercommonComponent,
children:[
  {path:"",
children:[
  {path:"",component:FrontpageComponent},
  {path:"showproduct",component:ShowproductComponent},
  {path:"prodata",component:ProductdataComponent},
  {path:"activate",component:AccountactivationComponent},
  {path:"viewcart",component:ViewcartComponent},
  {path:"bill",component:BillComponent},
  {path:"logout",component:LogoutComponent},
  {path:"myacc",component:MyaccountComponent},
  {path:"paymentdone",component:PaymentdoneComponent}


]}
]
}]
@NgModule({
  declarations: [FrontpageComponent, HeaderComponent, MenuComponent, BannerComponent, SectionComponent, ShowproductComponent, ProductdataComponent, UsercommonComponent, FooterComponent, AccountactivationComponent, LogoutComponent, ViewcartComponent, BillComponent, MyaccountComponent, PaymentdoneComponent],
  imports: [
    CommonModule,RouterModule.forChild(objuser),MatInputModule,
    MatFormFieldModule,MatRadioModule,FormsModule,ImageZoomModule
  ]
})
export class UserModule { }
