import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { MainComponent } from './components/main.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { CreateComponent } from './components/create.component';
import { LeavableService } from './leavable.service';
import { BackendService } from './backend.service';
import { PostingComponent } from './components/posting.component';
import { ProfileComponent } from './components/profile.component';
import { SearchComponent } from './components/search.component';

const ROUTES:Routes = [
  {path: '', component: MainComponent, canActivate: [ AuthService ]},
  {path: 'login', component: LoginComponent},
  {path: 'create', component: CreateComponent, canActivate: [ AuthService ], canDeactivate: [ LeavableService ]},
  {path: 'posting/:postId', component: PostingComponent, canActivate: [ AuthService ]},
  {path: 'profile/:user_id', component: ProfileComponent, canActivate: [ AuthService ]},
  {path: 'search', component: SearchComponent, canActivate: [ AuthService ]},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    CreateComponent,
    PostingComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService, LeavableService, BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
