import { Component, OnInit,OnDestroy } from '@angular/core';
import { UsersService } from './../../../services/users.service';
import { Subscription } from 'rxjs';
import { Users } from './../../../models/users.class';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  searchText;
  public Subscription : Subscription;
  public users : Users[] = [];
  public user : Users = null;
  constructor(
    public usersService : UsersService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.Subscription = this.usersService.getAllUsers().subscribe((data: Users[]) => {
       this.users = data;
      //console.log(data)
    }, error => {
      //console.log(error);
      this.usersService.handleError(error);
    });
  }

  ngOnDestroy() {
    if(this.Subscription)
    {
      this.Subscription.unsubscribe();
    }
  }

  edituser(item : Users)
  {
      this.user = item;
  }

  deleteuser(Mathe : string, Sosachdamuon : number)
  {
    console.log(Sosachdamuon);
    if(Sosachdamuon > 0){
      alert("Người dùng chưa trả hết sách đã mượn. Không thể xóa!");
      return;
    }
    this.Subscription = this.usersService.deleteuser(Mathe).subscribe((data: Users) => {
      //console.log(data);
     // console.log(data.Mathe);
      this.updateDataAfterDelete(Mathe);
      alert("Xóa thành công!!!");
    });
  }

  updateDataAfterDelete(Mathe : string){
      for( var i = 0; i < this.users.length; i++)
      {
          if( this.users[i].Mathe == Mathe)
          {
              this.users.splice(i,1);
              break;
          }
      }
  }
}