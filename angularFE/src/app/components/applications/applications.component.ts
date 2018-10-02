import { Component, OnInit } from '@angular/core';
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

  max: number;
  isReadonly: boolean;

  constructor(private appService: ApplicationService,
    private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.max = 5;
    this.isReadonly = true;

    this.getApplications();
  }

  getApplications(): void {
    this.appService.getApplications()
      .subscribe(apps => {

        let pathToImage;
        let pathToLogo;

        apps.forEach((app) => {
          for (let i = 0; i < app.imgs.length; i++) {
            pathToImage = app.imgs[i].substring(14, app.imgs[i].length);
            app.imgs[i] = pathToImage;
          }
          pathToLogo = app.logo.substring(14, app.logo.length);
          app.logo = pathToLogo;
        });
        this.applications = apps;
        this.getCategory(this.applications);
      }, err => {
        throw err;
      });
  }

  getCategory(applications): void {
    applications.forEach((app, index) => {
      this.categoryIdArray[index] = app.category;
      this.categoryService.getCategory(this.categoryIdArray[index])
        .subscribe(category => {
          this.categories.push(category);
          app.category = this.categories[index].name;
        }, err=>{
          throw err;
        });
    });
  }
}
