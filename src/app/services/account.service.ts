import { Injectable } from '@angular/core';
import { Account } from '../interfaces/account.interface';
import { TransactionService } from './transaction.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  currentAccount$: BehaviorSubject<Account> = new BehaviorSubject(null);

  constructor(private transactionService: TransactionService) {
    this.currentAccount$.next({
      name: 'My Personal Account',
      amountCurrency: {
        currencyCode: 'EUR',
        amount: '-5824.76'
      }
    });
  }

  getAccount(): Observable<Account> {
    return this.currentAccount$.asObservable();
  }

}
