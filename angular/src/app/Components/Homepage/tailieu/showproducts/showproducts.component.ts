import { Component, OnInit,Input} from '@angular/core';
import { error } from 'util';
import { from } from 'rxjs';
import { Nhomsach } from 'src/app/models/Nhomsach.class'
import { NhomsachService } from '../../../../services/nhomsach.service'

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {
  searchText;
  items = [];
  pageOfItems: Array<Nhomsach>;
  theloai1 :Nhomsach[] = [];
  Theloai1 :string = "";
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
        if(data[i].Matheloai === "1"){
          this.theloai1[j++] = data[i];
        }
      }
      this.Theloai1 = this.theloai1[0].Tentheloai;
      this.items = this.theloai1.map((x, i) => ({ Nhomsach: this.theloai1[i] }));
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
