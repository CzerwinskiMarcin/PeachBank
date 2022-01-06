import { Component, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { Observable, of } from 'rxjs';
import { AccountService } from './services/account.service';
import { Account } from './interfaces/account.interface';
import { Transaction } from './models/transaction.model';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  transactions$: Observable<Array<Transaction>> = of([]);
  account$: Observable<Account>;

  constructor(private transactionService: TransactionService, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.account$ = this.accountService.getAccount();
    this.transactions$ = this.transactionService.getTransactions();
  }

  onMakeTransaction(event: {targetAccount: string, amount: string}): void {
    this.account$
      .pipe(
        first(),
        tap(account => this.makeTransaction(account, event))
      ).subscribe();
  }

  onFilterByMerchantName(merchantName: string): void {
    this.transactionService.filterByMerchantName(merchantName);
  }

  makeTransaction(account: Account, {targetAccount, amount}: {targetAccount: string, amount: string}): void {
    const transaction = Transaction.createOutgoing(targetAccount, {amount, currencyCode: account.amountCurrency.currencyCode});
    this.transactionService.addTransaction(transaction);
  }
}
