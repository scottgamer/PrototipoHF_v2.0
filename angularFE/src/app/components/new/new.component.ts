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
  providers: [NewsService],
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  news: New;
  newId: string;

  constructor(private newsService: NewsService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['_id']) {
        this.newId = params['_id'];
        this.getNew(this.newId);
      }
    });
  }

  getNew(id): void {
    this.newsService.getNew(id)
      .subscribe(news => {
        this.news = news;
      },
        err => { throw err }
      );
  }



}
