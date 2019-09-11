import { Component, OnInit, Inject } from '@angular/core';
import { DbservicesService } from 'src/app/admin/dbservices.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
catdata:Object[];
subcatdata:Object[];
subsubcatdata:object[];


  constructor(@Inject (DbservicesService) public ser) {
    
    this.ser.serGetCat().subscribe(dt=>{ this.catdata=dt  })
    
      this.ser.serGetSubCat().subscribe(dt=>{this.subcatdata=dt })

      this.ser.serGetSubSubCat().subscribe(dt=>{this.subsubcatdata=dt })


   
    }
  ngOnInit() {
        
}
}
