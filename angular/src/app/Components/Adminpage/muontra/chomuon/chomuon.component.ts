import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChomuonService } from 'src/app/services/chomuon.service';
import { Chomuon } from 'src/app/models/chomuon.class';
import { MuontraService } from 'src/app/services/muontra.service';
import { Muontra } from 'src/app/models/muontra.class';

@Component({
  selector: 'app-chomuon',
  templateUrl: './chomuon.component.html',
  styleUrls: ['./chomuon.component.css']
})
export class ChomuonComponent implements OnInit {  

  public muontras : Muontra[] = [];

  public mathe : string;
  public masach : string;
  
  public subscription : Subscription;

  constructor(
    public chomuonService : ChomuonService,
    public muontraService : MuontraService
    ) { }

    ngOnInit() {
    }
  
    onAddChomuon(chomuon : Chomuon) {

    if(confirm("Xác nhận cho thành viên: '" +this.mathe+ "' mượn sách có id: '" +this.masach+ "'")){
      console.log(this.mathe,"-",this.masach);
      chomuon = new Chomuon(this.mathe, this.masach);
      this.subscription = this.chomuonService.addMuontra(chomuon).subscribe(data =>{
      console.log(data);
      });
      console.log("on edit da tra");
     } else {
    }
  }

  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
