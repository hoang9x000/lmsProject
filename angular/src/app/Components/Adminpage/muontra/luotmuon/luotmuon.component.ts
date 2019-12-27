import { Component, OnInit } from '@angular/core';
import { Luotmuon } from 'src/app/models/luotmuon.class';
import { LuotmuonService } from 'src/app/services/luotmuon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-luotmuon',
  templateUrl: './luotmuon.component.html',
  styleUrls: ['./luotmuon.component.css']
})
export class LuotmuonComponent implements OnInit {

  public luotmuons : Luotmuon[] = [];

  public subscription : Subscription;

  constructor(public luotmuonService : LuotmuonService) { }

  ngOnInit() {
  }
  // onClickOK(){
  //   this.subscription = this.luotmuonService.getLuotmuon(themluotmuon).subscribe(data => {

  //   })
  // }

}
