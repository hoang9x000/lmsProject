import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../../../models/user';
import { UserService} from '../../../services/user.service';
import { Phieumuon} from 'src/app/models/phieumuon/phieumuon.class';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadData();
  }
  loadData(){

  }
}
