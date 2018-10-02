import { Component, OnInit } from '@angular/core';

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

  //rating properties
  max: number;
  isReadonly: boolean;

  public constructor(private appService: ApplicationService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.max = 5;
    this.isReadonly = true;
    this.appService.getUri();
    this.getApplications();
    this.getSections();
  }

  getApplications(): void {
    this.appService.getApplications()
      .subscribe(applications => {

        let pathToImage;
        let pathToLogo;
        applications.forEach(app => {
          for (let i = 0; i < app.imgs.length; i++) {
            pathToImage = app.imgs[i].substring(14, app.imgs[i].length);
            app.imgs[i] = pathToImage;
          }
          pathToLogo = app.logo.substring(14, app.logo.length);
          app.logo = pathToLogo;
        });
        this.applications = applications;
        console.log(this.applications)
        this.getCategory(this.applications);
      }, err => {
        throw err;
      });
  }

  getSections(): void {
    this.sections = [{ section: 'Aplicaciones mejor valoradas', id: '4', route: '/applications' },
    { section: 'Últimas subidas', id: '2', route: '/applications' },
    { section: 'Baja Visión', id: '5ba11e036343f715c0e786bf', route: '/category' },
    { section: 'Ceguera', id: '5ba11dee6343f715c0e786be', route: '/category' }];
  }

  getCategory(applications): void {
    applications.forEach((app, index) => {
      this.categoryIdArray[index] = app.category;
      this.categoryService.getCategory(this.categoryIdArray[index])
        .subscribe(category =>{
          this.categories.push(category);
          app.category = this.categories[index].name;
        }, err =>{
          throw err;
        });
    });
  }

  onSelect(application: Application): void {
    this.selectedApplication = application;
    console.log('selected application: ' + this.selectedApplication.name);
  }

}
