import { Component, OnInit } from '@angular/core';
import { Muontra } from 'src/app/models/muontra.class';
import { Subscription } from 'rxjs';
import { MuontraService } from 'src/app/services/muontra.service';
import { Chomuon } from 'src/app/models/chomuon.class';
import { ChomuonService } from 'src/app/services/chomuon.service';
import { LuotmuonService } from 'src/app/services/luotmuon.service';
import { Luotmuonpost } from 'src/app/models/luotmuonPost.class';
import { Luotmuon } from 'src/app/models/luotmuon.class';
import { LuotmuonComponent } from './luotmuon/luotmuon.component';
import { error } from 'util';

@Component({
  selector: 'app-muontra',
  templateUrl: './muontra.component.html',
  styleUrls: ['./muontra.component.css']
})
export class MuontraComponent implements OnInit {

  public muontras : Muontra[] = [];
  public luotmuonid : Luotmuon[] = [];
  public subscription : Subscription;
  public muontra : Muontra = null;
  public i : Muontra = null;

  public mathe : string;
  public masach : string;
  // public ngaymuon : Date;
  // public ngayhethan : Date;
  // public giahan : boolean;
  // public datra : boolean = false;
  // public hoten : string;
  public tensach : string;
  public tinhtrangsach : boolean = false;

  public luotmuon : Luotmuon;

  constructor(
    public muontraService : MuontraService,
    public chomuonService : ChomuonService,
    public luotmuonService : LuotmuonService,
  ) { }

  // check(e){
  //   this.tinhtrangsach = e.target.value;
  //   console.log(this.tinhtrangsach);
  // }
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.subscription = this.muontraService.getAllMuontra().subscribe(data => {
      this.muontras = data;
    }, error => {
      console.log(error);
    });
  }

  onClickDatra(item : Muontra) {
    this.i = item;
    this.mathe = item.Mathe;
    this.masach = item.Masach;
    this.tensach = item.Tensach;
    this.muontra = item;
  }

  onXacnhanTinhtrang(){
    // update Chưa trả thành đã trả;
    this.muontra.Datra = true;
    this.subscription =  this.muontraService.updateDatra(this.muontra).subscribe(data =>{
      console.log("Kien ga", data);
      console.log(true)
    }, error => {
    });

    //sinh ra phieu luot muon; 
    let themluotmuon = new Luotmuonpost(this.mathe, this.masach, this.tinhtrangsach);
    console.log(themluotmuon);
    this.subscription = this.luotmuonService.addLuotmuon(themluotmuon).subscribe(data =>{
      console.log("vai dai");
      // this.subscription = this.luotmuonService.getLuotmuon(themluotmuon.Mathe, themluotmuon.Masach).subscribe(data =>{
        
      // }, error => {

      // });
    }, error => {
    });

    // this.luotmuon.Mathe = themluotmuon.Mathe;
    // this.luotmuon.Masach = themluotmuon.Masach;
    console.log(this.tinhtrangsach);
    
  }

  onClickOK(){
    // this.subscription = this.luotmuonService.getLuotmuon(this.luotmuon).subscribe(data => {

    // });
  }
  // onAddMuontra() {
  //   console.log(this.mathe,"-",this.masach);
  //   // let chomuon = new Chomuon(this.mathe, this.masach);
  //   // this.subscription = this.chomuonService.addMuontra(chomuon).subscribe(data =>{
  //   //   console.log(data);
  //   // });
  // } 

  onEditDatra(){ 
    // console.log(this.i);
    if(confirm("Xác nhận " + '"' +this.i.Mathe+ '"' + " đã trả " + '"' +this.i.Tensach)){
      // item.Datra =true;
      // this.chomuon = item; 
      // this.onUpdateDatra();

      console.log("on edit da tra");
     } else {
       
    }
  }

}
