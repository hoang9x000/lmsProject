import { Component, OnInit,Input } from '@angular/core';
import { Nhomsach } from 'src/app/models/Nhomsach.class'
import { NhomsachService } from '../../../../services/nhomsach.service'
@Component({
  selector: 'app-showproducts1',
  templateUrl: './showproducts1.component.html',
  styleUrls: ['./showproducts1.component.css']
})
export class Showproducts1Component implements OnInit {
  searchText;
  items = [];
  pageOfItems: Array<Nhomsach>;
  theloai2 :Nhomsach[] = [];
  Theloai2 :string = "";
  constructor(
    public nhomsachService: NhomsachService
  ) {}
  ngOnInit() {
    this.loadData()
  }
  loadData(){
    this.nhomsachService.getAllSach().subscribe(data => {
      //console.log(data);
      var j = 0;
      for(var i=0;i<data.length;i++){
        if(data[i].Matheloai === "2"){
          this.theloai2[j++] = data[i];
        }
      }
      this.Theloai2 = this.theloai2[0].Tentheloai;
      this.items = this.theloai2.map((x, i) => ({ Nhomsach: this.theloai2[i] }));
      //console.log(this.items);
    }, error => {
      console.log(error);
    }
    );
  }
  onChangePage(pageOfItems: Array<Nhomsach>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    //console.log(this.pageOfItems);
  }
}
