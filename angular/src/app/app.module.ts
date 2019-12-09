import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Header1Component } from './Homepage/header1/header1.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ThongtinComponent } from './Homepage/thongtin/thongtin.component';
import { QuydinhComponent } from './Homepage/quydinh/quydinh.component';
import { GioithieuComponent } from './Homepage/gioithieu/gioithieu.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { TailieuComponent } from './Homepage/tailieu/tailieu.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { Header2Component } from './Userpage/header2/header2.component';
import { UsersComponent } from './Userpage/users/users.component';
import { ProfileComponent } from './Userpage/profile/profile.component';
import { DetailbookComponent } from './Userpage/detailbook/detailbook.component';
import { GiahanComponent } from './Userpage/giahan/giahan.component';
import { DattruocComponent } from './Userpage/dattruoc/dattruoc.component';
import { ProductComponent } from './Components/product/product.component';
import { ShowproductsComponent } from './Homepage/tailieu/showproducts/showproducts.component';
import { AdminComponent } from './Adminpage/admin/admin.component';
import { SachComponent } from './Adminpage/sach/sach.component';
import { ThemsachComponent } from './Adminpage/sach/themsach/themsach.component';
import { MuontraComponent } from './Adminpage/muontra/muontra.component';
import { ChomuonComponent } from './Adminpage/muontra/chomuon/chomuon.component';
import { AdduserComponent } from './Adminpage/users/adduser/adduser.component';
import { SearchProductComponent } from './Components/search-product/search-product.component';

import{ProductsService} from './services/products.service';
import { Showproducts1Component } from './Homepage/tailieu/showproducts1/showproducts1.component';
import { Showproducts2Component } from './Homepage/tailieu/showproducts2/showproducts2.component'


@NgModule({
  declarations: [
    AppComponent,
    Header1Component,
    FooterComponent,
    HomeComponent,
    ThongtinComponent,
    QuydinhComponent,
    GioithieuComponent,
    DangnhapComponent,
    TailieuComponent,
    ChangepassComponent,
    Header2Component,
    UsersComponent,
    ProfileComponent,
    DetailbookComponent,
    GiahanComponent,
    DattruocComponent,
    ProductComponent,
    ShowproductsComponent,
    AdminComponent,
    SachComponent,
    ThemsachComponent,
    MuontraComponent,
    ChomuonComponent,
    AdduserComponent,
    SearchProductComponent,
    Showproducts1Component,
    Showproducts2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,

    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  providers: [
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
