import { Component, OnInit, OnDestroy } from '@angular/core';
import { NhomsachService } from './../../../../services/nhomsach.service';
import { Subscription } from 'rxjs';
import { Nhomsach } from './../../../../models/nhomsach.class';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Sach } from 'src/app/models/sach.class';

@Component({
  selector: 'app-themsach',
  templateUrl: './themsach.component.html',
  styleUrls: ['./themsach.component.css']
})
export class ThemsachComponent implements OnInit, OnDestroy {

  public nhomsachs: Nhomsach[] = [];
  public Subscription: Subscription;
  public Manhomsach: string;
  public Matheloai: string;
  public Magiasach: string;
  public Tentheloai: string;
  public Tensach: string;
  public Tacgia: string;
  public Giatien: number;
  public Soluong: number;
  public Soluongcon: number;
  public AnhPath: string;
  public response: { dbPath : '' };


  constructor(
    public nhomsachService: NhomsachService,
    public routerService: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.Subscription) {
      this.Subscription.unsubscribe();
    }
  }


  public uploadFinished = (event) => {
    this.response = event;
  }

  // public createImgPath(serverPath:string){
  //   return `http://localhost:5000/${serverPath}`;
  // }
  // public createImgPath(link :string){
  //   return 'http://localhost:5000/'+link;
  // }

  // add() {
  //   let addnhomsach: Nhomsach = {
  //     Manhomsach: this.Manhomsach,
  //     Matheloai: this.Matheloai,
  //     Magiasach: this.Magiasach,
  //     Tensach: this.Tensach,
  //     Tacgia: this.Tacgia,
  //     Tentheloai: this.Tentheloai,
  //     Giatien: this.Giatien,
  //     Soluong: this.Soluong,
  //     Soluongcon: this.Soluongcon,
  //     AnhPath: this.response.dbPath
  //   };
  //   console.log(this.response.dbPath)
  //   if (this.response.dbPath == undefined) {
  //     this.AnhPath = this.response.dbPath = "";
  //     console.log(addnhomsach)
  //     this.Subscription = this.nhomsachService.getAdd(addnhomsach)
  //       .subscribe(data => {
  //         this.nhomsachs.push(data);
  //         console.log(data);
  //         this.routerService.navigateByUrl('/sach');
  //       }, error => {
  //         //console.log(error);
  //         this.nhomsachService.handleError(error);
  //       });

  //   }
  //   else {
  //     this.AnhPath = this.response.dbPath;
  //     console.log(addnhomsach)
  //     this.Subscription = this.nhomsachService.getAdd(addnhomsach)
  //       .subscribe(data => {
  //         this.nhomsachs.push(data);
  //         console.log(data);
  //         this.routerService.navigateByUrl('/sach');
  //       }, error => {
  //         //console.log(error);
  //         this.nhomsachService.handleError(error);
  //       });
  //   }

  // }

  add1() {
    let addnhomsach: Nhomsach = {
      Manhomsach: this.Manhomsach,
      Matheloai: this.Matheloai,
      Magiasach: this.Magiasach,
      Tensach: this.Tensach,
      Tacgia: this.Tacgia,
      Tentheloai: this.Tentheloai,
      Giatien: this.Giatien,
      Soluong: this.Soluong,
      Soluongcon: this.Soluongcon,
      AnhPath: this.response.dbPath,

    };
    console.log(addnhomsach)
    this.Subscription = this.nhomsachService.getAdd(addnhomsach)
      .subscribe(data => {
        this.nhomsachs.push(data);
        console.log(data);
        this.routerService.navigateByUrl('/sach');
      }, error => {
        //console.log(error);
        this.nhomsachService.handleError(error);
      });
  }


}
