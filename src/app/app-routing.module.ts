import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  // localhost/host1/host2 mira el path /host1 i el path /host1/host2
  // Per tant, path: "" ha d'anar al final, sino hi entraria sempre
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
