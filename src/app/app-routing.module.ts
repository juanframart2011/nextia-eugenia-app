import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RecoveryComponent } from './pages/auth/recovery/recovery.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { AuthGuard } from './auth.guard';
import { InvitationListComponent } from './pages/invitation/invitation-list/invitation-list.component';
import { InvitationCreateComponent } from './pages/invitation/invitation-create/invitation-create.component';

const routes: Routes = [
  { 
    path: "", component: LoginComponent, pathMatch: "full"
  },
  {
    path: 'auth',
    children: [
      { path: '', component: LoginComponent },
      { path: 'recovery', component: RecoveryComponent },
      { path: 'register', component: RegisterComponent },      
    ]
  },
  { path: 'home', component: InvitationListComponent, canActivate: [AuthGuard] },
  {
    path: 'invitation',
    children: [
      { path: '', component: InvitationListComponent, canActivate: [AuthGuard] },
      { path: 'create', component: InvitationCreateComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: InvitationCreateComponent, canActivate: [AuthGuard] },      
    ]
  },
  { path: 'recuperar/:token', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
