import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Phieumuon } from 'src/app/models/phieumuon/phieumuon.class';
import { ModalService } from '../../../_modal';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public user: User[] = [];
  constructor(
    public userService: UserService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    var _mathe = this.currentUserSubject.value.Mathe.toString();
    // console.log(_mathe);
    this.userService.ShowProfile(_mathe).subscribe(data => {
      console.log(data);
      this.user = data;

    }, error => {
      console.log(error);
    });
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  onUpdatePass(item:User){
    console.log(item)
  }
}
