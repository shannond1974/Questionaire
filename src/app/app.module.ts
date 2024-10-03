import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import {Navbar} from './UIComponents/app.navbar';
import {Header} from './UIComponents/app.header';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormComponent } from './form/form.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    Header,
    Navbar,
    FormComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,CommonModule,
    FormsModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
