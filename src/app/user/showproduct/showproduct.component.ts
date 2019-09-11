import { Component, OnInit, Inject } from '@angular/core';
import { DbservicesService } from 'src/app/admin/dbservices.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {
varsubsubcatid
productdata
  constructor(@Inject(DbservicesService) public ser,@Inject(ActivatedRoute) public ar) {
  this.ar.params.subscribe(dt=>{
  this.varsubsubcatid=dt.subsubcatid
   //alert(this.varsubsubcatid)
    this.getproductdata();
  })
   }

   ngOnInit() {}
  
   //getproductdata based on subsubcatid
   
   getproductdata(){
    var obj={subsubcatid:parseInt(this.varsubsubcatid)}
    this.ser.getsubsubcatid(obj).subscribe(dt=>{
    this.productdata=dt
    })
  }
}
