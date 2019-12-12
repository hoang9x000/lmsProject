import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../../../models/user';
import { UserService} from '../../../services/user.service';
import { Phieumuon} from 'src/app/models/phieumuon/phieumuon.class';

@Component({
  selector: 'app-giahan',
  templateUrl: './giahan.component.html',
  styleUrls: ['./giahan.component.css']
})
export class GiahanComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public phieumuon: Phieumuon[] = [];

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    var _mathe = this.currentUserSubject.value.Mathe.toString();
    //console.log(_mathe);
    this.userService.Showphieumuon(_mathe).subscribe(data => {
    this.phieumuon = data[0].Phieumuon;
    console.log(data[0].Phieumuon);
    }, error => {
      console.log(error);
    }
    );
  }
}
