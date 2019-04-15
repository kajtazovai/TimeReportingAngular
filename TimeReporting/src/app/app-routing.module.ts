import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {TimereportingComponent} from './timereporting/timereporting.component';
import {ProjectComponent} from "./project/project.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'create', component: CreateUserComponent},
  {path: 'timereport', component: TimereportingComponent},
  {path: 'projects', component: ProjectComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
