import { Component, OnInit, OnDestroy } from '@angular/core';
import { MuontraService } from '../../../services/muontra.service'
import { Muontra } from 'src/app/models/muontra.class';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-muontra',
  templateUrl: './muontra.component.html',
  styleUrls: ['./muontra.component.css']
})
export class MuontraComponent implements OnInit, OnDestroy {

  public muontras : Muontra[] = [];
  public mathe : string;
  public masach : string;
  public ngaymuon :string;
  public subscription : Subscription;

  constructor(
    public muontraService : MuontraService,
  ) { 

  }

  ngOnInit() {
    
  }

  loadData() {
    this.subscription = this.muontraService.getAllMuontra().subscribe(data => {
      this.muontras = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

  addMuontra() {
    let muontra = new Muontra();
    this.subscription = this.muontraService.addMuontra(muontra).subscribe(data => {

    });
  } 
}
