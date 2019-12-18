import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Phieumuon } from 'src/app/models/phieumuon/phieumuon.class';
import { DattruocService } from '../../../services/dattruoc.service';

@Component({
  selector: 'app-giahan',
  templateUrl: './giahan.component.html',
  styleUrls: ['./giahan.component.css']
})
export class GiahanComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public phieumuon: Phieumuon[] = [];

  constructor(
    public userService: UserService,
    public dattruocService: DattruocService
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    var _mathe = this.currentUserSubject.value.Mathe.toString();
    //console.log(_mathe);
    this.userService.Showphieumuon(_mathe).subscribe(data => {
      console.log(data[0].Phieumuon[0].Datra);
      this.phieumuon = data[0].Phieumuon;
        }, error => {
      console.log(error);
    }
    );
  }
  onGiahan(item:Phieumuon){
    // console.log(item);
    this.dattruocService.UpdatePhieumuon(item).subscribe(data=>{
      this.loadData();
    }, error => {
      console.log(error);
    });
  }
}
