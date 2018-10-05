import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';

//classes
import { Category } from '../app/models/category-model';

//services
import { CategoryService } from '../app/services/category.service';

import { ValidateService } from '../app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  providers: [CategoryService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  categories: Category;
  options: Object[];

  //menu component
  isCollapsed = true;

  searchTerm: string;

  public constructor(private titleService: Title,
    private collapse: CollapseModule,
    private categoryService: CategoryService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    public authService: AuthService,
    private router: Router) {
    this.isCollapsed = true;
  }

  ngOnInit() {
    this.setTitle('Catalogo de Aplicaciones para Discapacidad Visual');
    this.getCategories();
    this.getOptions();
    this.logged();
  }

  logged() {
    let logged = false;
    logged = this.authService.loggedIn();
    return logged;
  }

  onSearch() {
    let term = {
      term: this.searchTerm
    };

    console.log(term);
  }

  onLogout() {
    this.authService.logout();
    this.flashMessagesService.show('Acabas de cerrar sesión', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
    return false;
  }

  getOptions() {
    this.options = [{ name: 'Aplicaciones', route: '/applications' },
    { name: 'Noticias', route: '/news' },
    { name: 'Eventos', route: '/events' }];
  }

  //no longer necessary
  //until evaluation
  reloadRoute = function () {
    this.location.reload();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        return true;
      },
        err => {
          console.log(err);
          return false;
        });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
