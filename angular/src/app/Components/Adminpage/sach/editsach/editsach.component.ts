import { Component, OnInit, OnDestroy } from '@angular/core';
import { NhomsachService } from './../../../../services/nhomsach.service';
import { Subscription } from 'rxjs';
import { Nhomsach } from './../../../../models/nhomsach.class';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-editsach',
  templateUrl: './editsach.component.html',
  styleUrls: ['./editsach.component.css']
})
export class EditsachComponent implements OnInit {

  // public nhomsachs: Nhomsach[] = [];
  public Subscription: Subscription;
  public SubscriptionParams : Subscription;
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
  public response: {dbPath: ''};
  public nhomsach : Nhomsach;

  constructor(
    public nhomsachService : NhomsachService,
    public activatedRouteService : ActivatedRoute,
    public routerService : Router
  ) { }

  ngOnInit() {
    this.nhomsach = new Nhomsach();
    this.loadData();
  }

  hand(e){
    this.Tentheloai = e.target.value;
    console.log(this.Tentheloai)
  }

  loadData()
  {
      this.SubscriptionParams = this.activatedRouteService.params.subscribe( ( data : Params) => {
        //console.log(data)
        let Manhomsach = data['Manhomsach'];
        this.Subscription = this.nhomsachService.getNhomsach(Manhomsach).subscribe( ( nhomsach: Nhomsach ) => {
            console.log(nhomsach[0]);
            this.nhomsach = nhomsach[0];
        });
        
      })
  }

  public uploadFinished = (event) => {
    this.response = event;
  }


  oneditnhomsach()
  {
    // let nhomsach: Nhomsach = {
    //   Manhomsach: this.Manhomsach,
    //   Matheloai: this.Matheloai,
    //   Magiasach: this.Magiasach,
    //   Tensach: this.Tensach,
    //   Tacgia: this.Tacgia,
    //   Tentheloai: this.Tentheloai,
    //   Giatien: this.Giatien,
    //   Soluong: this.Soluong,
    //   Soluongcon: this.Soluongcon,
    //   AnhPath: this.response.dbPath,

    // };
    this.nhomsach.AnhPath = this.response.dbPath;
    this.Subscription = this.nhomsachService.updateNhomsach(this.nhomsach).subscribe( (data : Nhomsach) => {
        //console.log(data)
        this.routerService.navigateByUrl('/sach');
    });
  }

  ngOnDestroy() {
    if(this.Subscription)
    {
      this.Subscription.unsubscribe();
    }
    if(this.SubscriptionParams)
    {
      this.SubscriptionParams.unsubscribe();
    }
  }

}
