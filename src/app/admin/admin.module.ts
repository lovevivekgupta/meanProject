import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmincommonhomeComponent } from './admincommonhome/admincommonhome.component';
import { Admin1Component } from './admin1/admin1.component';
import { Admin2Component } from './admin2/admin2.component';
import { RouterModule,Routes } from '@angular/router';
import { MatInputModule } from  '@angular/material/input';
import { MatAutocompleteModule} from "@angular/material/autocomplete";
import { MatSelectModule} from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe'
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SubsubcategoryComponent } from './subsubcategory/subsubcategory.component';
import { ProductsComponent } from './products/products.component'
var objadmin:Routes=[{path:"",component:AdmincommonhomeComponent,
children:[
  {path:"",children:
  [
    {path:"ad1",component:Admin1Component},
    {path:"ad2",component:Admin2Component},
    {path:"ssct",component:SubsubcategoryComponent},
    {path:"products",component:ProductsComponent}
]
  }
]
}]
@NgModule({
  declarations: [AdmincommonhomeComponent, Admin1Component, Admin2Component, SubsubcategoryComponent, ProductsComponent],
  imports: [
    CommonModule,RouterModule.forChild(objadmin),MatInputModule,MatAutocompleteModule,
    MatSelectModule,NgxPaginationModule,FormsModule,OrderModule,Ng2SearchPipeModule
  ]
})
export class AdminModule { }
