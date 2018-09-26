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
  selector: 'app-home',
  providers: [ApplicationService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  applications: Application[];
  categoryIdArray: string[] = [];
  categories: Category[] = [];

  sections: { section: string, id: string, route: string }[];

  selectedApplication: Application;

  public constructor(private barRatingModule: BarRatingModule,
    private appService: ApplicationService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.getApplications();
    this.getSections();
  }

  getApplications(): void {
    this.appService.getApplications()
      .subscribe(applications => {
        this.applications = applications;
        this.getCategory(this.applications);
      }, err => {
        throw err;
      });
  }

  getSections(): void {
    this.sections = [{ section: 'Aplicaciones más descargadas', id: '4', route: '/applications' },
    { section: 'Últimas subidas', id: '2', route: '/applications' },
    { section: 'Baja Visión', id: '5ba11e036343f715c0e786bf', route: '/category' },
    { section: 'Ceguera', id: '5ba11dee6343f715c0e786be', route: '/category' }];
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

  onSelect(application: Application): void {
    this.selectedApplication = application;
    console.log('selected application: ' + this.selectedApplication.name);
  }

}
