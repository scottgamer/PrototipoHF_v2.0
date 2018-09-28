import { Component, OnInit, TemplateRef } from '@angular/core';

import { BarRatingModule } from "ngx-bar-rating";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
//classes
import { Application } from '../../../models/application-model';
import { Category } from '../../../models/category-model';
//services
import { ApplicationService } from '../../../services/application.service';
import { CategoryService } from '../../../services/category.service';

import { ApplicationsComponent } from '../../applications/applications.component';

@Component({
  selector: 'app-admin-applications',
  templateUrl: './admin-applications.component.html',
  styleUrls: ['./admin-applications.component.css']
})
export class AdminApplicationsComponent implements OnInit {

  /* appService:ApplicationService;
  categoryService:CategoryService; */

  application: Application;
  applications: Application[];
  categoryIdArray: string[] = [];
  categories: Category[] = [];
  allCategories: Category;
  platforms: String[] = [];
  androidVersions: string[] = [];

  modalRef: BsModalRef;

  //appsComponent = new ApplicationsComponent(this.appService, this.categoryService);

  constructor(private appService: ApplicationService,
    private categoryService: CategoryService,
    private modalService: BsModalService) {

  }

  ngOnInit() {
    this.initApplication();
    this.getApplications();
    this.initCategories();
    this.getCategories();
    this.getPlatforms();
    this.getAndroidVersions();
  }

  initApplication() {
    this.application = new Application();
  }

  initCategories() {
    this.allCategories = new Category();
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

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.allCategories = categories;
        console.log(this.allCategories);
      }, err => {
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

  getPlatforms() {
    this.platforms = ['Android', 'Navegador Web'];
  }

  getAndroidVersions() {
    this.androidVersions = [
      'Cupacake 1.5',
      'Donut 1.6',
      'Eclair 2.0',
      'Froyo 2.2',
      'Gingerbread 2.3',
      'Honeycomb 3.0',
      'Ice Cream Sandwich 4.0',
      'Jelly Bean 4.1',
      'KitKat 4.4',
      'Lollipop 5.0',
      'Marshmallow 6.0',
      'Noutgat 7.0',
      'Oreo 8.0',
      'Pie 9.0'
    ];
  }

  onSubmitApplication() {
    let application = {
      name: this.application.name,
      logo: this.application.logo,
      imgs: this.application.imgs,
      category: this.application.category,
      description: this.application.description,
      country: this.application.country,
      developedBy: this.application.developedBy,
      version: this.application.version,
      releaseDate: this.application.releaseDate,
      platform: this.application.platform,
      androidMin: this.application.androidMin,
      appWebPage: this.application.appWebPage
    };

    console.log(application);

    /* this.appService.postApplication(application)
      .subscribe(data => {
        console.log(data);
        return true;
      }, err => {
        throw err;
      }); */

  }

  /* onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
        
        // need to run CD since file load runs outside of zone
        // this.cd.markForCheck();
      };
    }
  }
 */
  addNewApplication(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeAllModals() {
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
  }

  modalConfirm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

}
