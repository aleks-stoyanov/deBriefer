import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainAreaComponent } from './main-area/main-area.component';
import { ErrandsComponent } from './errands/errands.component';
import { ErrandListComponent } from './errands/errand-list/errand-list.component';
import { ErrandDetailsComponent } from './errands/errand-details/errand-details.component';
import { ErrandItemComponent } from './errands/errand-list/errand-item/errand-item.component';
import { ErrandListManagerComponent } from './errands/errand-list-manager/errand-list-manager.component';
import { DrawerAreaComponent } from './drawer-area/drawer-area.component';
import { MainHeroComponent } from './main-area/main-hero/main-hero.component';
import { DrawerHeroComponent } from './drawer-area/drawer-hero/drawer-hero.component';

import {ErrandService} from './errands/errand.service';
import {UserStorageService} from './shared/user-storage.service';
import {TaskListService} from './shared/task-list.service';
import { ErrandFormComponent } from './errands/errand-form/errand-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainAreaComponent,
    ErrandsComponent,
    ErrandListComponent,
    ErrandDetailsComponent,
    ErrandItemComponent,
    ErrandListManagerComponent,
    DrawerAreaComponent,
    MainHeroComponent,
    DrawerHeroComponent,
    ErrandFormComponent
   ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [ErrandService, UserStorageService, TaskListService, ErrandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
