import { Component, OnInit } from '@angular/core';
import { TransactionService } from './services/transaction.service';
import { Observable, of } from 'rxjs';
import { Transaction } from './interfaces/transaction.interface';
import { AccountService } from './services/account.service';
import { Account } from './interfaces/account.interface';

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

}
