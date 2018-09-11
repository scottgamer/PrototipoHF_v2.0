import { Component, OnInit, Input } from '@angular/core';

//dynamic routing using ids in url
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

//classes
import { New } from '../../models/new-model';
//services
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-new',
  providers:[NewsService],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @Input() new: New;

  constructor(private newsService:NewsService,
              private route:ActivatedRoute,
              private location:Location) { }

  ngOnInit() {
    this.getNew();
  }

  getNew(): void {
    // static image of the route information
    const id = +this.route.snapshot.paramMap.get('id');
    this.newsService.getNew(id)
      .subscribe(neew => this.new = neew);
  }

  

}
