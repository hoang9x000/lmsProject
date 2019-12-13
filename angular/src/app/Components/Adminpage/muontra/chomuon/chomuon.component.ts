import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChomuonService } from '../../../../services/chomuon.service';
// import { Subsciption } from 'rxjs-compat';
import { Subscription } from 'rxjs';
import { Chomuon } from 'src/app/models/chomuon.class';

@Component({
  selector: 'app-chomuon',
  templateUrl: './chomuon.component.html',
  styleUrls: ['./chomuon.component.css']
})
export class ChomuonComponent implements OnInit, OnDestroy {

  //get dl
  public chomuons : Chomuon[] = [];
  public subscription : Subscription;

  public qh : number = 0;
  public phat : number = 0;

  constructor(
    public chomuonService : ChomuonService
  ) { 

  }

  ngOnInit() {
    this.loadData();
    this.Quahan();
    this.Phat();
  }

  loadData() {
    this.subscription = this.chomuonService.getAllChomuon().subscribe(data => {
      this.chomuons = data;
      console.log("OK");
      
      for (var i=0; i<this.chomuons.length ; i++){
        console.log(i);        
      }
    }, error => {
      // this.chomuonService.handleError(error);
      console.log(error);
    });
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  Phat(){
    return this.phat;
  }

  Quahan(){ 
    this.qh = this.timeDistace();
  }

  timeDistace(){  //tinh so ngay qua han;
    let dt = new Date("2019-10-15")
    // console.log(this.nhh);
    let td = Date.now() - dt.getTime();
    td = Math.floor(td/(24*3600*1000));
    if (td < 0) return 0;
    else return td;
  }


}
