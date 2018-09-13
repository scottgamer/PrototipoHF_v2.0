import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ValidateService } from './services/validate.service';

//import { AppBootstrapModule } from './app-bootstrap/app-bootstrap.module';
//Bootstrap components using ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { BarRatingModule } from "ngx-bar-rating";

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

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'applications', component:ApplicationsComponent},
  {path:'news', component:NewsComponent},
  {path:'new/:id', component:NewComponent},
  {path:'events', component:EventsComponent},
  {path:'event/:id', component:EventComponent},
  {path:'application/:id', component:ApplicationComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'user/:id', component:UserComponent},
  {path:'category/:id', component:CategoryComponent},
  {path:'help', component:HelpComponent},
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    BarRatingModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    Title,
    ValidateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
