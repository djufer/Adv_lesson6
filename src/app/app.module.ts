import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { RegisterModalComponent } from './modals/register-modal/register-modal.component';
import { PostModalComponent } from './modals/post-modal/post-modal.component';
import { ModalsService } from './shared/services/modals.service';
import { FormsModule } from '@angular/forms';
import { MyDatePipe } from './shared/pipes/date.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostListComponent,
    LoginModalComponent,
    RegisterModalComponent,
    PostModalComponent,
    MyDatePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
