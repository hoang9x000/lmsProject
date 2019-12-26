import { Component, OnInit, OnDestroy } from '@angular/core';
import { NhomsachService } from './../../../services/nhomsach.service';
import { Subscription, from } from 'rxjs';
import { Nhomsach } from './../../../models/nhomsach.class'

@Component({
  selector: 'app-sach',
  templateUrl: './sach.component.html',
  styleUrls: ['./sach.component.css']
})
export class SachComponent implements OnInit, OnDestroy {

  searchText;
  public Subscription : Subscription;
  public nhomsach : Nhomsach[] = [];

  constructor( 
    public nhomsachService : NhomsachService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.Subscription = this.nhomsachService.getAllSach().subscribe(( data : Nhomsach[]) => {
      //console.log(data)
      this.nhomsach = data;
    }, error => {
      //console.log(error);
      this.nhomsachService.handleError(error);
    });
  }


  ngOnDestroy() {
    if(this.Subscription)
    {
      this.Subscription.unsubscribe();
    }
  }

  ondeletenhomsach(Manhomsach : string)
  {
    this.Subscription = this.nhomsachService.deletenhomsach(Manhomsach).subscribe((data: Nhomsach) => {
       console.log(data);
     // console.log(data.Manhomsach);
      //this.updateDataAfterDelete(Manhomsach);
    });
  }

  // updateDataAfterDelete(Manhomsach : string){
  //     for( var i = 0; i < this.nhomsach.length; i++)
  //     {
  //         if( this.nhomsach[i].Manhomsach == Manhomsach)
  //         {
  //             this.nhomsach.splice(i,1);
  //             break;
  //         }
  //     }
  // }

}
