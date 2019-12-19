import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DattruocService } from '../../../../services/dattruoc.service';
import { Dattruoc } from '../../../../models/dattruoc.class';
@Component({
  selector: 'app-userdattruoc',
  templateUrl: './userdattruoc.component.html',
  styleUrls: ['./userdattruoc.component.css']
})
export class UserdattruocComponent implements OnInit {
  public dattruoc: Dattruoc[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public dattruocService: DattruocService
  ) {}

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    let mathe = this.activatedRoute.snapshot.params['Mathe'];
    // console.log(mathe);
    this.dattruocService.Showdattruoc(mathe).subscribe(data => {

      this.dattruoc = data[0].Dattruoc;
      // console.log(this.dattruoc[0].Mathe);
      //  this.dattruoc = data[0].Dattruoc;
    }, error => {
      console.log(error);
    }
    );
  }
  onUpdateDattruoc(item: Dattruoc) {
    // console.log(item);
    this.dattruocService.UpdateDattruoc(item).subscribe(data => {
      // console.log(data)
      this.loadData();
    }, error => {
      console.log(error);
    }
    );
  }

}
