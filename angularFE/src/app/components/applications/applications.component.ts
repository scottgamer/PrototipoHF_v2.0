import { Component, OnInit } from '@angular/core';
//modules
import { BarRatingModule } from "ngx-bar-rating";
//classes
import { Application } from '../../models/application-model';
import { Category } from '../../models/category-model';
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
  categoryIdArray: string[] = [];
  categories: Category[] = [];

  constructor(private appService: ApplicationService,
    private categoryService: CategoryService,
    private barRatingModule: BarRatingModule) {
  }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    this.appService.getApplications()
      .subscribe(applications => {
        this.applications = applications;
        this.getCategory(this.applications);
      }, err=>{
        throw err;
      });
  }

  getCategory(applications): void {
    for (let i = 0; i < applications.length; i++) {
      this.categoryIdArray[i] = applications[i].category;
      this.categoryService.getCategory(this.categoryIdArray[i])
        .subscribe(category => {
          this.categories.push(category);
          applications[i].category = this.categories[i].name;
        },
          err => {
            throw err;
          });
    }
  }

}
