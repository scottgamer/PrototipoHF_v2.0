import { Component, OnInit, Input } from '@angular/core';

//dynamic routing using ids in url
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//classes
import { Category } from '../../models/category-model'; 
//services
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  providers:[CategoryService],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category:Category;

  constructor(private categoryService:CategoryService,
              private activatedRoute:ActivatedRoute,
              private location:Location) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory():void{
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.categoryService.getCategory(id)
      .subscribe(category => this.category = category);
  }

  



}
