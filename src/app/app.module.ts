import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarBottomComponent } from './toolbar-bottom/toolbar-bottom.component';
import { WorkoutPageComponent } from './workout-page/workout-page.component';
import { ToolbarHeaderComponent } from './toolbar-header/toolbar-header.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarBottomComponent,
    WorkoutPageComponent,
    ToolbarHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
