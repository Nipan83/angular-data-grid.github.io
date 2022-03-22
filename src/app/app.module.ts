import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSortModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
