import { Component, OnInit,Input } from '@angular/core';
import { Nhomsach } from 'src/app/models/productsNhomsach.class';
@Component({
  selector: 'app-showproducts1',
  templateUrl: './showproducts1.component.html',
  styleUrls: ['./showproducts1.component.css']
})
export class Showproducts1Component implements OnInit {
  @Input ('key') theloai2 :Nhomsach[] = [];
  @Input ('key1') Theloai2 :string = "";
  constructor() {}
  ngOnInit() {
  }

}
