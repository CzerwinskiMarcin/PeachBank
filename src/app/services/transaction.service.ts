import { Injectable } from '@angular/core';
import { TransactionApiService } from './transaction-api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions$: BehaviorSubject<Array<Transaction>> = new BehaviorSubject([]);

  constructor(private api: TransactionApiService) {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.api.getTransactions()
      .pipe(
        tap(transactions => this.transactions$.next(transactions))
      ).subscribe();
  }

  getTransactions(): Observable<Array<Transaction>> {
    return this.transactions$.asObservable();
  }
}
