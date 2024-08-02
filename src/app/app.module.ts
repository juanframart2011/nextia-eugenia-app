import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { HttpInterceptorService } from './http-interceptor';
import { FormsModule } from '@angular/forms';
import { RecoveryComponent } from './pages/auth/recovery/recovery.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InvitationListComponent } from './pages/invitation/invitation-list/invitation-list.component';
import { InvitationCreateComponent } from './pages/invitation/invitation-create/invitation-create.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    RecoveryComponent,
    RegisterComponent,
    ChangePasswordComponent,
    NavbarComponent,
    InvitationListComponent,
    InvitationCreateComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
