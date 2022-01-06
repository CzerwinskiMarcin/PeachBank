import { Injectable } from '@angular/core';
import { TransactionApiService } from './transaction-api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ITransaction } from '../interfaces/transaction.interface';
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
        map(transactions => transactions.filter(t => t.getMerchantName().toLocaleLowerCase().includes(this.merchantName))),
      )
      ;
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
