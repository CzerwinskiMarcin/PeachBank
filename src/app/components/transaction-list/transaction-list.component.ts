import { Component, Input } from '@angular/core';
import { Transaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  @Input() transactions: Array<Transaction> = [];

  trackTransactionBy(index: number, transaction: Transaction): string {
    return transaction.id;
  }
}
