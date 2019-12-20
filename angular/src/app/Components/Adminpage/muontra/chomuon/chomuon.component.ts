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

  public chomuons : Chomuon[] = [];
  public subscription : Subscription;
  public chomuon : Chomuon = null;
  public i : Chomuon = null;

  public mathe : string;
  // public masach : string;
  // public ngaymuon : Date;
  // public ngayhethan : Date;
  // public giahan : boolean;
  // public datra : boolean = false;
  // public hoten : string;
  public tensach : string;


  public qh : number = 0;

  constructor(
    public chomuonService : ChomuonService
  ) { 

  }

  ngOnInit() {
    this.loadData();
    // this.onUpdateDatra();
    // this.Quahan();
  }

  loadData() {
    this.subscription = this.chomuonService.getAllChomuon().subscribe(data => {
      this.chomuons = data;
      // console.log(this.chomuons);
      
    }, error => {
      // this.chomuonService.handleError(error);
      console.log(error);
    });
  }

  // timeDistace(ngay :Date){  //tinh so ngay qua han;
  //   let dt = new Date("2019-10-15")
  //   this.chomuons[1].Masach;
  //   let td = Date.now() - ngay.getTime();
  //   td = Math.floor(td/(24*3600*1000));

  //   if (td < 0) return 0;
  //   else return td;
  // }

  onClickDatra(item : Chomuon) {
    this.i = item;
    this.mathe = item.Mathe;
    this.tensach = item.Tensach;
  }

  onXacnhanTinhtrang(){

  }

  onEditDatra(){ 

    console.log(this.i);
    if(confirm("Xác nhận " + '"' +this.i.Mathe+ '"' + " đã trả " + '"' +this.i.Tensach)){
      // item.Datra =true;
      // this.chomuon = item; 
      // this.onUpdateDatra();

      console.log("on edit da tra");
     } else {
       
    }
  }

  onUpdateDatra() {
      this.subscription = this.chomuonService.updateDatra(this.chomuon).subscribe(data => {   
        console.log(data);
      }, error =>{
        console.log(Error);
      })   
    
  }

  // public chanceColor() {
  //   for (let i = 0; i<this.chomuons.length; i++){
  //     if(this.chomuons[i].Datra){
  //       document.getElementById("btn-tra").style.backgroundColor = "green";
  //     } else {
  //       document.getElementById("btn-tra").style.backgroundColor = "red";
  //     }
  //   }
  // }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  

}
