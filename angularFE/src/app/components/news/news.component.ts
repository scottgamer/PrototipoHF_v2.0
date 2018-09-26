import { Component, OnInit } from '@angular/core';

//classes
import { New } from '../../models/new-model';

//services
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  providers: [NewsService],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: New[];

  constructor(private newService: NewsService) {
  }

  ngOnInit() {
    this.getNews();
  }

  getNews(): void {
    this.newService.getNews()
      .subscribe(news => {
        this.news = news;
      }, err => {
        throw err
      });
  }



}
