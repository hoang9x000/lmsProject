import { Component, OnInit } from '@angular/core';
import { Nhomsach } from 'src/app/models/Nhomsach.class'
import { NhomsachService } from '../../../services/nhomsach.service'
@Component({
  selector: 'app-tailieu',
  templateUrl: './tailieu.component.html',
  styleUrls: ['./tailieu.component.css']
})
export class TailieuComponent implements OnInit {
  public theloai1 : Nhomsach[] = [];
  public theloai2 : Nhomsach[] = [];
  public theloai3 : Nhomsach[] = [];
  public nhomsach: Nhomsach[] = [];
  public Theloai1 : string = "";
  public Theloai2 : string = "";
  public Theloai3 : string = "";
  constructor(public nhomsachService: NhomsachService) { }

  ngOnInit() {
    this.loadData();
  }
  loadData()
  {
    this.nhomsachService.getAllSach().subscribe(data => {
      //console.log(data);
      var j = 0;
      var k = 0;
      var l = 0;
      for(var i=0;i<data.length;i++){
        if(data[i].Matheloai === "1"){
          this.theloai1[j++] = data[i];
        }
        else if(data[i].Matheloai === "2"){
          this.theloai2[k++] = data[i];
        }
        else this.theloai3[l++] = data[i];
      }
      this.Theloai1 = this.theloai1[0].Tentheloai;
      this.Theloai2 = this.theloai2[0].Tentheloai;
      this.Theloai3 = this.theloai3[0].Tentheloai;
      // console.log(this.theloai[0].Nhomsach[0]);
    }, error => {
      console.log(error);
    }
    );
  }
}
