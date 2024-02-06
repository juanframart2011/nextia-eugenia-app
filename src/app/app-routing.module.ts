import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecoveryComponent } from './pages/auth/recovery/recovery.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const routes: Routes = [
  { 
    path: "", component: LoginComponent, pathMatch: "full"
  },
  {
    path: 'auth',
    children: [
      { path: '', component: LoginComponent },
      { path: 'recovery', component: RecoveryComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
