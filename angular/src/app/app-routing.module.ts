import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {ThongtinComponent} from './Homepage/thongtin/thongtin.component';
import { QuydinhComponent } from './Homepage/quydinh/quydinh.component';
import { GioithieuComponent } from './Homepage/gioithieu/gioithieu.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { TailieuComponent } from './Homepage/tailieu/tailieu.component';
import { UsersComponent } from './Userpage/users/users.component';
import { ProfileComponent } from './Userpage/profile/profile.component';
import { DetailbookComponent } from './Userpage/detailbook/detailbook.component';
import { DattruocComponent } from './Userpage/dattruoc/dattruoc.component';
import { GiahanComponent } from './Userpage/giahan/giahan.component';
import { ChangepassComponent } from './changepass/changepass.component';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'home', component: HomeComponent },
  {path: 'thongtin' , component: ThongtinComponent},
  {path: 'quydinh' , component: QuydinhComponent},
  {path: 'gioithieu' , component:GioithieuComponent},
  {path: 'dangnhap' , component: DangnhapComponent},
  {path: 'tailieu' , component: TailieuComponent},
  {path: 'users' ,component: UsersComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'detailbook' , component: DetailbookComponent},
  {path: 'dattruoc' , component: DattruocComponent},
  {path: 'giahan' , component: GiahanComponent},
  {path: 'changepass' , component: ChangepassComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
