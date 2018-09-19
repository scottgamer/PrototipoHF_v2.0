import { Component, OnInit, Input } from '@angular/core';

//dynamic routing using ids in url
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//classes
import { Category } from '../../models/category-model';
//services
import { CategoryService } from '../../services/category.service';
import { Application } from '../../models/application-model';

@Component({
  selector: 'app-category',
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  //@Input() category: Category;
  category: Category;
  applications: Application[];

  constructor(private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      if (params['_id']) {
        this.getCategory(params['_id']);
        /* console.log('apps loaded');
        this.getAppsByCategory(params['_id']); */
      }
    });
    this.getAppsByCategory();

    console.log('estas son las aplicaciones: ' + this.applications);
  }

  getCategory(id): void {
    this.categoryService.getCategory(id)
      .subscribe(category => {
        this.category = category;
        console.log(this.category);
      });
  }

  getAppsByCategory(): void{
    this.categoryService.getAppsByCategory()
      .subscribe(application => {
        this.applications = application;
        console.log('using service: ' + this.applications)
      });
  }

  /* getCategories() {
    this.categoryService.getCategories().
      subscribe(
        category => {
          this.category = category;
        },
        err => {
          if (err) console.log(err);
          return false;
        });
  } */

}
