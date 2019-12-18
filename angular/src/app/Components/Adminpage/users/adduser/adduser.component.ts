import { Component, OnInit } from '@angular/core';
//import { Users } from 'src/app/models/users.class';
import { UsersService } from './../../../../services/users.service';
import { Subscription } from 'rxjs';
import { Users } from './../../../../models/users.class';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  public users : Users[]=[];
  public Subscription : Subscription;
  public Mathe : string;
  public Password: string;
  public Hoten : string;
  public Gioitinh : boolean =true;
  public Ngaysinh : Date;
  public Diachi : string;
  public Ngaydangki : Date;
  public Ngayhethan : Date;
  public Role : string;
  
  constructor(
    public usersService : UsersService,
    public routerService : Router
  ) { }
  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.Subscription)
    {
      this.Subscription.unsubscribe();
    }
  }


  add(){
    let adduser : Users = {
      Mathe : this.Mathe,
      Password: this.Password,
      Hoten : this.Hoten,
      Gioitinh : this.Gioitinh,
      Ngaysinh : this.Ngaysinh,
      Diachi : this.Diachi,
      Ngaydangki : this.Ngaydangki,
      Ngayhethan : this.Ngayhethan,
      Role : this.Role,
    };
    console.log(adduser)
    this.Subscription = this.usersService.getAdd(adduser)
    .subscribe(data =>{
       this.users.push(data);
      console.log(data);
      this.routerService.navigateByUrl('/users');
    },  error => {
      //console.log(error);
      this.usersService.handleError(error);
    });

  }

}
