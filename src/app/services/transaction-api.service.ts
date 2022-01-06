import { Injectable } from '@angular/core';
import { ITransaction } from '../interfaces/transaction.interface';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import * as mockData from 'src/assets/transactions.json';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {
  api: string;

  constructor() {
    this.api = environment.transactionApiUrl;
  }

  // For good practices I should create another layer of abstraction to separate the api response model from application model
  // and some guards for checking if response is supported.
  getTransactions(): Observable<Array<ITransaction>> {
    return of((mockData.data as any as Array<ITransaction>));
  }
}
