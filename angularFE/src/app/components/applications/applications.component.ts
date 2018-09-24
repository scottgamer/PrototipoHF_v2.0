import { Component, OnInit } from '@angular/core';
//modules
import { BarRatingModule } from "ngx-bar-rating";
//classes
import { Application } from '../../models/application-model';
//services
import { ApplicationService } from '../../services/application.service';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-applications',
  providers: [ApplicationService],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications: Application[];
  categories: any[];

  constructor(private appService: ApplicationService,
    private categoryService: CategoryService,
    private barRatingModule: BarRatingModule) {
  }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    this.appService.getApplications()
      .subscribe(applications => { this.applications = applications; console.log(this.applications) });
  }

  getCategory(): void {
    for (let i = 0; i < this.applications.length; i++) {
      let category = this.applications[i].category;
      console.log(category);
    }

    /* this.categoryService.getCategory(id)
      .subscribe(category => {
        this.category = category;
      }); */
  }

}
