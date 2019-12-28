import { Component, OnInit, Input } from '@angular/core';
import { Nhomsach } from 'src/app/models/Nhomsach.class'
import { NhomsachService } from '../../../../services/nhomsach.service'
@Component({
  selector: 'app-showproducts2',
  templateUrl: './showproducts2.component.html',
  styleUrls: ['./showproducts2.component.css']
})
export class Showproducts2Component implements OnInit {
  searchText;
  items = [];
  pageOfItems: Array<Nhomsach>;
  theloai3: Nhomsach[] = [];
  Theloai3: string = "";
  constructor(
    public nhomsachService: NhomsachService
  ) { }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.nhomsachService.getAllSach().subscribe(data => {
      //console.log(data);
      var j = 0;
      for (var i = 0; i < data.length; i++) {
        if (data[i].Matheloai === "3") {
          this.theloai3[j++] = data[i];
        }
      }
      this.Theloai3 = this.theloai3[0].Tentheloai;
      this.items = this.theloai3.map((x, i) => ({ Nhomsach: this.theloai3[i] }));
      console.log(this.items);
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
