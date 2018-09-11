import { Component, OnInit } from '@angular/core';

//classes
import { Help } from '../../models/help-model';
//services 
import { HelpService } from '../../services/help.service';

@Component({
  selector: 'app-help',
  providers: [HelpService],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  helpArticles:Help[];

  constructor(private helpService:HelpService) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles(): void{
    this.helpService.getHelpArticles().subscribe(article => this.helpArticles = article);
  }



}
