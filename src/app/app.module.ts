import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BbUIModule } from '../bb-ui/bb-ui.module';
import { TransferComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { NegativeCurrencyPipe } from './pipes/negative-currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TransferComponent,
    TransactionListComponent,
    TransactionItemComponent,
    NegativeCurrencyPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BbUIModule,
    SharedModule
  ],
  providers: [CurrencyPipe, NegativeCurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
