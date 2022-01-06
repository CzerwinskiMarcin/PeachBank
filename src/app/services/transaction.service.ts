import { Injectable } from '@angular/core';
import { TransactionApiService } from './transaction-api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions$: BehaviorSubject<Array<Transaction>> = new BehaviorSubject([]);
  merchantName = '';

  constructor(private api: TransactionApiService) {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.api.getTransactions()
      .pipe(
        map(transactions => transactions.map(t => new Transaction(t))),
        tap(transactions => this.transactions$.next(transactions))
      ).subscribe();
  }

  getTransactions(): Observable<Array<Transaction>> {
    return this.transactions$.asObservable()
      .pipe(
        map(transactions => transactions.sort(this.sortTransactionsByDate)),
        map(transactions => transactions.filter(t => t.getMerchantName().toLocaleLowerCase().includes(this.merchantName))),
      )
      ;
  }

  sortTransactionsByDate(t1: Transaction, t2: Transaction): number {
    const t1Date = new Date(t1.getDate());
    const t2Date = new Date(t2.getDate());

    // We can make subtraction of two dates
    // @ts-ignore
    return t2Date - t1Date;
  }

  filterByMerchantName(merchantName: string): void {
    this.merchantName = merchantName.toLocaleLowerCase();
    this.updateTransactions();
  }

  updateTransactions(): void {
    this.transactions$.next([...this.transactions$.getValue()]);
  }

  addTransaction(transaction: Transaction): void {
    this.transactions$.next([transaction, ...this.transactions$.getValue()]);
  }
}
