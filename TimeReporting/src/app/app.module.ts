import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { MaterialModule } from './material.module';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatNativeDateModule,
  MatSelectModule
} from "@angular/material";
import {MatDatepicker} from "@angular/material/typings/esm5/datepicker";
import { DeletedialogtimereportComponent } from './deletedialogtimereport/deletedialogtimereport.component';
import { HeaderComponent } from './header/header.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EdittimereportComponent } from './edittimereport/edittimereport.component';
import { DeleteprojectComponent } from './deleteproject/deleteproject.component';
import { EditprojectComponent } from './editproject/editproject.component';
import { EmployeesComponent } from './employees/employees.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteemployeeComponent } from './deleteemployee/deleteemployee.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    TimereportingComponent,
    ProjectComponent,
    NewtimereportComponent,
    DeletedialogtimereportComponent,
    HeaderComponent,
    EdituserComponent,
    EdittimereportComponent,
    DeleteprojectComponent,
    EditprojectComponent,
    EmployeesComponent,
    DashboardComponent,
    EdituserComponent,
    DeleteemployeeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,

  ],
  providers: [UserService,FormsModule,ProjectService,HttpClientModule],
  bootstrap: [AppComponent],
  entryComponents:[NewtimereportComponent,DeletedialogtimereportComponent,EdittimereportComponent,DeleteprojectComponent,EditprojectComponent,EdituserComponent,DeleteemployeeComponent]
})
export class AppModule {
    

 }
