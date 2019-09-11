import { Component, OnInit,Inject } from '@angular/core';
import { DbservicesService } from 'src/app/admin/dbservices.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  myaacountdata
  constructor(@Inject (DbservicesService) public ser) {
  
    this.ser.serFetchInMyAccount({fname:localStorage.getItem("fn")}).subscribe(dt=>{
     
     this.myaacountdata=dt
    })
   }

  ngOnInit() {
  }

}
