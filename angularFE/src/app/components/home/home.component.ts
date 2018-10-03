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

  bestRatedApps: Application[];
  latestApps: Application[];
  lowVisionApps: Application[];
  blindnessApps: Application[];

  categoryIdArray: string[] = [];
  categories: Category[] = [];

  blindnessId: string;
  lowVisionId: string;

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

    this.blindnessId = '5ba11dee6343f715c0e786be';
    this.lowVisionId = '5ba11e036343f715c0e786bf';

    this.getBestRatedApplications();
    this.getLatestApplications();
    this.getAppsByBlindness(this.blindnessId);
    this.getAppsByLowVision(this.lowVisionId);
    this.getSections();
  }

  getBestRatedApplications() {
    this.appService.getBestRated()
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
        this.bestRatedApps = applications;
        this.getCategory(this.bestRatedApps);
      }, err => {
        throw err;
      });
  }

  getAppsByLowVision(categoryId) {
    this.appService.getAppsByCategory(categoryId)
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
        this.lowVisionApps = applications;
        this.getCategory(this.lowVisionApps);
      }, err => {
        throw err;
      });
  }

  getAppsByBlindness(categoryId) {
    this.appService.getAppsByCategory(categoryId)
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
        this.blindnessApps = applications;
        this.getCategory(this.blindnessApps);
      }, err => {
        throw err;
      });
  }

  getLatestApplications() {
    this.appService.getLatest()
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
        this.latestApps = applications;
        this.getCategory(this.latestApps);
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

  //TODO fix category overwritting
  getCategory(applications): void {
    applications.forEach((app, index) => {
      this.categoryIdArray[index] = app.category;
      this.categoryService.getCategory(this.categoryIdArray[index])
        .subscribe(category => {
          this.categories.push(category);
          app.category = this.categories[index].name;
        }, err => {
          throw err;
        });
    });
  }

  onSelect(application: Application): void {
    this.selectedApplication = application;
    console.log('selected application: ' + this.selectedApplication.name);
  }

}
