import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Login } from './models/login';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { CreateUserComponent } from './create-user/create-user.component';
import { TimereportingComponent } from './timereporting/timereporting.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    TimereportingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
  ],
  providers: [UserService,FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {
    

 }
