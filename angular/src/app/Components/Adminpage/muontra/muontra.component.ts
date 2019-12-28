import { Component, OnInit } from '@angular/core';
import { Muontra } from 'src/app/models/muontra.class';
import { Subscription } from 'rxjs';
import { MuontraService } from 'src/app/services/muontra.service';
import { Chomuon } from 'src/app/models/chomuon.class';
import { ChomuonService } from 'src/app/services/chomuon.service';
import { LuotmuonService } from 'src/app/services/luotmuon.service';
import { Luotmuonpost } from 'src/app/models/luotmuonPost.class';
import { Luotmuon } from 'src/app/models/luotmuon.class';
import { LuotmuonComponent } from './luotmuon/luotmuon.component';
import { error } from 'util';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { SachService } from 'src/app/services/sach.service';
import { UserDetail } from 'src/app/models/user-detail.class';
import { Sach } from 'src/app/models/sach.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-muontra',
  templateUrl: './muontra.component.html',
  styleUrls: ['./muontra.component.css']
})
export class MuontraComponent implements OnInit {

  searchText;
  public muontras : Muontra[] = [];
  public luotmuonid : Luotmuon[] = [];
  public subscription : Subscription;
  public muontra : Muontra = null;
  public i : Muontra = null;



  public userdetail: UserDetail = null;
  public sach: Sach = null;

  public mathe: string;
  public masach: string;
  public nhh = [];
  public quahan = [];
  public tensach: string;
  public tinhtrangsach: boolean = true;

  public luotmuon: Luotmuon;

  constructor(
    public muontraService: MuontraService,
    public chomuonService: ChomuonService,
    public luotmuonService: LuotmuonService,
    public userdetailService: UserDetailService,
    public sachService: SachService,
    public routerService: Router,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.subscription = this.muontraService.getAllMuontra().subscribe(data => {
      this.muontras = data;

      //Tao mang moi voi gia gia tri ngayhethan
      // this.nhh.pop();
      for (var i = 0; i < this.muontras.length; i++) {
        this.nhh.push(this.muontras[i].Ngayhethan);
      };

      //gan gia tri ngay qua han cho qh[]
      this.quahan = this.nhh.map((value, index, nhh) => {
        let val = (new Date(value)).getTime();
        if (Date.now() < val) {
          return 0;
        }
        else {
          return Math.floor((Date.now() - val) / (24 * 3600 * 1000));
        }
      });
    }, error => {
      console.log(error);
    });
  }

  //them phieu muon
  onAddChomuon(chomuon: Chomuon) {
    if (confirm("Xác nhận cho thành viên: '" + this.mathe + "' mượn sách có id: '" + this.masach + "'")) {
      //lay dl thanhvien
      this.subscription = this.userdetailService.getUserDetail(this.mathe).subscribe(data => {
        this.userdetail = data;
        console.log("<<==>>", this.userdetail);

        let ngayhethan = new Date(this.userdetail.Ngayhethan);
        if ((ngayhethan.getTime() <= Date.now()) || (this.userdetail.Sosachdamuon > 6)) {
          alert("tài khoản đã hết hạn hoặc hết lượt mượn sách");
        }
        else {
          //lay dl sach
          this.subscription = this.sachService.getSach(this.masach).subscribe(data => {
            this.sach = data;
            console.log("<<==>>", this.sach);
            if (this.sach[0].Tinhtrangsach === false) {
              alert("Sách đã bị mất hoặc hư hại");
            }
            else {
              if (this.sach[0].Damuon === true) {
                alert("Sách đã được mượn");
              }
              else {
                chomuon = new Chomuon(this.mathe, this.masach);
                this.subscription = this.chomuonService.addMuontra(chomuon).subscribe(data => {
                  alert("Đã thêm phiếu mượn");

                  //kiểm tra thong tin sach
                  this.subscription = this.sachService.getSach(this.masach).subscribe(data => {
                    console.log("==>>", data);
                  });

                  //kiểm tra thong tin the
                  this.subscription = this.userdetailService.getUserDetail(this.mathe).subscribe(data => {
                    console.log("==>>", data);
                  });
                  this.onClickOK();
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

  //lay gia tri row duoc nhan
  onClickDatra(item: Muontra) {
    this.i = item;
    this.mathe = item.Mathe;
    this.masach = item.Masach;
    this.tensach = item.Tensach;
    this.muontra = item;
  }

  //tra sach va view hoa don
  onXacnhanTinhtrang() {
    //kiểm tra thong tin sach
    this.subscription = this.sachService.getSach(this.masach).subscribe(data => {
      console.log("<<==>>", data);
    });

    // update Chưa trả thành đã trả;
    this.muontra.Datra = true;
    let tt = Boolean(this.tinhtrangsach);
    this.subscription = this.muontraService.updateDatra(this.muontra).subscribe(data => {
      let themluotmuon = new Luotmuonpost(this.mathe, this.masach, tt);
      console.log(themluotmuon);

      //sinh ra phieu luot muon;
      this.subscription = this.luotmuonService.addLuotmuon(themluotmuon).subscribe(data => {
        this.subscription = this.luotmuonService.getLuotmuon(themluotmuon.Mathe, themluotmuon.Masach).subscribe(data => {
          this.luotmuonid = data;

          console.log("tinh trang sach", tt);
          //kiểm tra thong tin the
          this.subscription = this.userdetailService.getUserDetail(this.mathe).subscribe(data => {
            console.log("Thông tin thành viên", data);
          });

          //kiểm tra thong tin sach
          this.subscription = this.sachService.getSach(this.masach).subscribe(data => {
            console.log("Thông tin sách", data);
          })
        }, error => {
          alert("không thể lấy dữ liệu phiếu mươn");
        });
      }, error => {
        // alert("Không thể sinh phiểu luotmuon");
      });
    }, error => {
      alert("Cập nhật thuộc tính sách bị lỗi");
    });
  }

  onCheckRadio() {

  }
  onClickOK() {
    //lam rong mang va load lai data
    this.nhh = [];
    this.loadData()
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
