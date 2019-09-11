import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbservicesService } from 'src/app/admin/dbservices.service';

@Component({
  selector: 'app-accountactivation',
  templateUrl: './accountactivation.component.html',
  styleUrls: ['./accountactivation.component.css']
})
export class AccountactivationComponent implements OnInit {

  constructor(@Inject (ActivatedRoute) public ar,@Inject (DbservicesService) public ser) { }

  ngOnInit() {
    this.ar.params.subscribe(dt=>{
     // alert(dt.tk)
      var tok={token:dt.tk}  
      this.ser.accountActivateService(tok).subscribe(dt=>{
        alert(dt.msg)
      })
    })
  }

}
