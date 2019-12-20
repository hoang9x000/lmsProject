import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { MuontraService } from '../../../services/muontra.service'
import { Muontra } from 'src/app/models/muontra.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-muontra',
  templateUrl: './muontra.component.html',
  styleUrls: ['./muontra.component.css']
})
export class MuontraComponent implements OnInit, OnDestroy {

  // public muontras : Chomuon[] = [];
  // public muontra : Muontra = null;
  public mathe : string;
  public masach : string;
  
  public subscription : Subscription;

  constructor(
    public muontraService : MuontraService,
  ) { 

  }

  ngOnInit() {
    // this.loadData();
  }

  // loadData() {
  //   this.subscription = this.muontraService.getAllMuontra().subscribe(data => {
  //     this.muontras = data;
  //     // console.log(this.muontras);
  //   }, Error =>{
  //     console.log(Error);
  //   });
  // }

  onAddMuontra() {
    console.log(this.masach,"-",this.mathe);
    let muontra = new Muontra(this.mathe, this.masach);
    this.subscription = this.muontraService.addMuontra(muontra).subscribe(data =>{
      console.log(data);
    });
  } 

  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
