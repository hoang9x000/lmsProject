import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChomuonService } from 'src/app/services/chomuon.service';
import { Chomuon } from 'src/app/models/chomuon.class';
import { MuontraService } from 'src/app/services/muontra.service';
import { Muontra } from 'src/app/models/muontra.class';
import { SachService } from 'src/app/services/sach.service';
import { Sach } from 'src/app/models/sach.class';

import { error } from 'util';
import { UserDetail } from 'src/app/models/user-detail.class';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chomuon',
  templateUrl: './chomuon.component.html',
  styleUrls: ['./chomuon.component.css']
})
export class ChomuonComponent implements OnInit {

  public muontras: Muontra[] = [];
  public sach: Sach = null;
  public userdetail: UserDetail = null;

  public mathe: string;
  public masach: string;

  public subscription: Subscription;

  constructor(
    public chomuonService: ChomuonService,
    public muontraService: MuontraService,
    public sachService: SachService,
    public userdetailService: UserDetailService,
    public routerService: Router,
  ) { }

  ngOnInit() {
    this.userdetail = new UserDetail;
  }

  onAddChomuon(chomuon: Chomuon) {
    if (confirm("Xác nhận cho thành viên: '" + this.mathe + "' mượn sách có id: '" + this.masach + "'")) {
      this.subscription = this.userdetailService.getUserDetail(this.mathe).subscribe(data => {
        this.userdetail = data;


        console.log(this.userdetail);
        let ngayhethan = new Date(this.userdetail.Ngayhethan);
        if ((ngayhethan.getTime() <= Date.now()) && (this.userdetail.Sosachdamuon >= 7)) {
          alert("tài khoản đã hết hạn hoặc hết lượt mượn sách");
        }
        else {
          alert("mã thẻ hợp lệ");
          // console.log((ngayhethan.getTime() - Date.now()) / 1000 / 3600 / 24);
          this.subscription = this.sachService.getSach(this.masach).subscribe(data => {
            this.sach = data;
            alert("mã sách hợp lệ");
            console.log(this.sach);
            console.log()
            if (this.sach[0].Tinhtrangsach === false) {
              alert("Sách đã bị mất hoặc hư hại");
            }
            else {
              if (this.sach[0].Damuon === true) {
                alert("Sách đã được mượn");
              }
              else {
                console.log(this.mathe, "-", this.masach);
                chomuon = new Chomuon(this.mathe, this.masach);
                this.subscription = this.chomuonService.addMuontra(chomuon).subscribe(data => {
                  this.routerService.navigateByUrl('http://localhost:4200/muontra');
                  console.log(data);
                  // alert("Đã thêm phiếu mượn");
                  // alert.call(this.onSelected);
                  // this.routerService.navigateByUrl('/muontra');
                  // this.routerService.navigate(['danhsachmuon']);
                });
              }
            }
          }, error => {
            alert("Nhập mã sách sai");
          })
        }
      }, error => {
        alert("Nhập sai mã thẻ");
      });
    } else { }
  }
  onSelected() {
    this.routerService.navigate(['chomuon']);
  }

  refresh(): void {
    window.location.reload();
    this.routerService.navigate(['muontra']);
}


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
