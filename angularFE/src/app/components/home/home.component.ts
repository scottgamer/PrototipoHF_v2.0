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
  categories: Category[];

  sections:{section: string, id:string, route:string}[];

  lorem: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem adipisci quod nemo ' +
    'vitae cumque sit, iusto porro! Eligendi nesciunt et amet numquam dolore voluptatem a ' +
    'maiores deleniti. Ex, cum ipsam.';

  selectedApplication:Application;

  public constructor(private barRatingModule: BarRatingModule, 
                    private appService:ApplicationService,
                    private categoryService:CategoryService) {}

  ngOnInit() {
    this.getApplications();
    this.getSections();
    
  }

  getApplications(): void {
    this.appService.getApplications()
        .subscribe(applications => this.applications = applications);
  }

  getSections():void{
    this.sections = [ {section: 'Aplicaciones más descargadas', id: '4', route: '/applications'},
                      {section: 'Últimas subidas', id: '2', route: '/applications'},
                      {section: 'Baja Visión', id: '5ba11e036343f715c0e786bf', route: '/category'},
                      {section: 'Ceguera', id:'5ba11dee6343f715c0e786be', route: '/category'}];
  }

  getCategories():void{
    this.categoryService.getCategories().
          subscribe(categories => this.categories=categories);
  }

  onSelect(application: Application): void {
    this.selectedApplication = application;
    console.log('selected application: ' + this.selectedApplication.name );
  }

}
