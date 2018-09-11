import { Component, OnInit } from '@angular/core';
//modules
import { BarRatingModule } from "ngx-bar-rating";
//classes
import { Application } from '../../models/application-model'; 
//services
import { ApplicationService } from '../../services/application.service';


@Component({
  selector: 'app-applications',
  providers: [ApplicationService],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications:Application[];

  constructor(private appService:ApplicationService, private barRatingModule:BarRatingModule) { }

  ngOnInit() {
    this.getApplications();
  }

  getApplications(): void {
    this.appService.getApplications()
        .subscribe(applications => this.applications = applications);
    console.log('Applications service loaded');
  }

}
