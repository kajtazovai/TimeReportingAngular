import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { TimereportingComponent } from './timereporting/timereporting.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { ProjectComponent } from './project/project.component';
import {ProjectService} from "./services/project.service";
import { NewtimereportComponent } from './newtimereport/newtimereport.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';
//import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    TimereportingComponent,
    ProjectComponent,
    NewtimereportComponent,
    // MatButtonModule,
    // MatCheckboxModule,
    //MatDialogModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    BrowserAnimationsModule
  ],
  providers: [UserService,FormsModule,ProjectService,HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
    

 }
