import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BbUIModule } from '../bb-ui/bb-ui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BbUIModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
