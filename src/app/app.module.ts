import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BbUIModule } from '../bb-ui/bb-ui.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TransactionItemComponent, TransactionListComponent, TransferComponent } from './components';
import { NegativeCurrencyPipe } from './pipes/negative-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TransferComponent,
    TransactionListComponent,
    TransactionItemComponent,
    NegativeCurrencyPipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    BbUIModule,
    SharedModule
  ],
  providers: [CurrencyPipe, NegativeCurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
