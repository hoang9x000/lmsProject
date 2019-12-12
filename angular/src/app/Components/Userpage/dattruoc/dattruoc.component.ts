import { Component, OnInit } from '@angular/core';
import { DattruocService } from '../../../services/dattruoc.service';
import { Dattruoc} from 'src/app/models/dattruoc.class';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../../../models/user';
@Component({
  selector: 'app-dattruoc',
  templateUrl: './dattruoc.component.html',
  styleUrls: ['./dattruoc.component.css']
})
export class DattruocComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public dattruoc: Dattruoc[] = [];
  constructor(
    public dattruocService: DattruocService
  ) {

  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    var _mathe = this.currentUserSubject.value.Mathe.toString();
    //console.log(_mathe);
    this.dattruocService.Showdattruoc(_mathe).subscribe(data => {
    for(var i = 0;i< data.length;i++){
      if(data[0].Dattruoc[i].Danhan== false){
        this.dattruoc = data[0].Dattruoc;
      }
    }
  //  this.dattruoc = data[0].Dattruoc;
    console.log(this.dattruoc);
    }, error => {
      console.log(error);
    }
    );
  }

}
