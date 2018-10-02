import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { ApplicationService } from './services/application.service';

//Bootstrap components using ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RatingModule } from 'ngx-bootstrap/rating';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { NewsComponent } from './components/news/news.component';
import { EventsComponent } from './components/events/events.component';
import { ApplicationComponent } from './components/application/application.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { NewComponent } from './components/new/new.component';
import { EventComponent } from './components/event/event.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CategoryComponent } from './components/category/category.component';
import { HelpComponent } from './components/help/help.component';
import { AdminAccountComponent } from './components/admin/admin-account/admin-account.component';
import { AdminApplicationsComponent } from './components/admin/admin-applications/admin-applications.component';
import { AdminEventsComponent } from './components/admin/admin-events/admin-events.component';
import { AdminNewsComponent } from './components/admin/admin-news/admin-news.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'new/:_id', component: NewComponent },
  { path: 'events', component: EventsComponent },
  { path: 'event/:_id', component: EventComponent },
  { path: 'application/:_id', component: ApplicationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'account', component: AdminAccountComponent },
      { path: 'applications', component: AdminApplicationsComponent },
      { path: 'events', component: AdminEventsComponent },
      { path: 'news', component: AdminNewsComponent }]
  },
  { path: 'category/:_id', component: CategoryComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ApplicationsComponent,
    HomeComponent,
    NewsComponent,
    EventsComponent,
    ApplicationComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    NewComponent,
    EventComponent,
    PageNotFoundComponent,
    CategoryComponent,
    HelpComponent,
    AdminAccountComponent,
    AdminApplicationsComponent,
    AdminEventsComponent,
    AdminNewsComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    Title,
    ValidateService,
    AuthService,
    CategoryService,
    ApplicationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
