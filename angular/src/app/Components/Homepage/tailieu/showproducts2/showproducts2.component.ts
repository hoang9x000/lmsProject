import { Component, OnInit,Input } from '@angular/core';
import { Nhomsach } from 'src/app/models/productsNhomsach.class';
@Component({
  selector: 'app-showproducts2',
  templateUrl: './showproducts2.component.html',
  styleUrls: ['./showproducts2.component.css']
})
export class Showproducts2Component implements OnInit {
  searchText;
  @Input ('key') theloai3 :Nhomsach[] = [];
  @Input ('key1') Theloai3 :string = "";
  constructor() {}
  ngOnInit() {
  }
}
