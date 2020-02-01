import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from "./admin/admin.component";
import { TramComponent } from "./tram/tram.component";
import { AuthGuard } from './_helpers';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path:"map",
    component: MapComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard]    // accés restringit a usuaris logged in
  },
  {
    path: "tram",
    component: TramComponent,
    canActivate: [AuthGuard]    // accés restringit a usuaris logged in
  },

  // otherwise redirect to home
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
