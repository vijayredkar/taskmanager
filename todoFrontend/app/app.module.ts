import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { TaskComponent } from './products/task.component';
import { NavbarComponent } from './nav/nav.component';

import { TaskService } from './products/task.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [ BrowserModule,
                   FormsModule,
                   AppRoutingModule,
                   HttpModule
                   ],
  declarations: [ AppComponent,
                          TaskComponent,
                          NavbarComponent
                          ],
  providers: [ TaskService ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }