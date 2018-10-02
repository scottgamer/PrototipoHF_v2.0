import { Component, OnInit, Input } from '@angular/core';

//dynamic routing using ids in url
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//classes
import { Category } from '../../models/category-model';
import { Application } from '../../models/application-model';
//services
import { CategoryService } from '../../services/category.service';
import { ApplicationService } from '../../services/application.service';


@Component({
  selector: 'app-category',
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: Category;
  applications: Application[];
  categoryId: any;

  //rating properties
  max: number;
  isReadonly: boolean;
  overStar: number;

  constructor(private categoryService: CategoryService,
    private appService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit() {
    this.max = 5;
    this.isReadonly = true;

    this.activatedRoute.params.subscribe(params => {
      if (params['_id']) {
        this.categoryId = params['_id'];
        this.getCategory(this.categoryId);
        this.getAppsByCategory(this.categoryId);
      }
    });
  }

  getCategory(id): void {
    this.categoryService.getCategory(id)
      .subscribe(category => {
        this.category = category;
      });
  }


  getAppsByCategory(id): void {
    this.appService.getAppsByCategory(id)
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
      }, err=>{
        throw err;
      });
  }

}
