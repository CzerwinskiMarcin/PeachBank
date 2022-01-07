import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { TransactionApiService } from './transaction-api.service';
import { Observable, of } from 'rxjs';
import { ITransaction } from '../interfaces/transaction.interface';
import * as mockData from 'src/assets/test-mock-transactions.json';
import { first, tap } from 'rxjs/operators';
import { Transaction } from '../models/transaction.model';

class MockTransactionApiService {
  getTransactions(): Observable<Array<ITransaction>> {
    return of((mockData.data as any as Array<ITransaction>));
  }
}

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionService, {provide: TransactionApiService, useClass: MockTransactionApiService}]
    });

    service = TestBed.inject(TransactionService);
  });

  it('should have some data from api', (done) => {
    service.getTransactions().pipe(
      first(),
      tap(transactions => expect(transactions).toHaveSize(2)),
      tap(done)
    ).subscribe();
  });

  it('should be sorted by date', async () => {
    const transactions = await service.getTransactions().pipe(first()).toPromise();

    // @ts-ignore
    const sortedMockData = mockData.data.sort((a, b) => new Date(b.dates.valueDate) - new Date(a.dates.valueDate));
    const areSortedTheSame = transactions.every((t, index) => t.getDate() === sortedMockData[index].dates.valueDate);

    expect(areSortedTheSame).toBeTrue();
  });

  describe('filterByMerchantName', () => {
    it('should filter by merchant name', async () => {
      const searchName = 'backb';
      service.filterByMerchantName(searchName);

      const transactions = await service.getTransactions().pipe(first()).toPromise();
      const areFiltered = transactions.every(t => t.getMerchantName().toLocaleLowerCase().includes(searchName));

      expect(areFiltered).toBeTrue();
    });

    it('should return transactions if there is no matching names', async () => {
      const searchName = 'ajsiodfjaoit3u2u9jr9tohr';
      service.filterByMerchantName(searchName);

      const transactions = await service.getTransactions().pipe(first()).toPromise();

      expect(transactions).toHaveSize(0);
    });

    it('should return all transactions if there filtering by empty string', async () => {
      const searchName = '';
      service.filterByMerchantName(searchName);

      const transactions = await service.getTransactions().pipe(first()).toPromise();

      expect(transactions).toHaveSize(mockData.data.length);
    });

  });

  it('should add transaction', async () => {
    const transaction = Transaction.createOutgoing('test', {amount: '1', currencyCode: 'EUR'});
    const oldTransactions = await service.getTransactions().pipe(first()).toPromise();

    service.addTransaction(transaction);

    const newTransactions = await service.getTransactions().pipe(first()).toPromise();

    expect(newTransactions).toHaveSize(oldTransactions.length + 1);
  });

});
