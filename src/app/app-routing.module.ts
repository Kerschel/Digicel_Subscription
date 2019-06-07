import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SubsriptionComponent } from './components/subsription/subsription.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuardService]  },
  {path:"subscriptions/:id",component:SubsriptionComponent,canActivate:[AuthGuardService]  },
  {path:"register",component:RegisterComponent}
  
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes),ModalModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,HomeComponent,RegisterComponent,SubsriptionComponent]