import { Component, Input } from '@angular/core';
import { Transaction } from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-item-transaction',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent {
  @Input() set transaction(transaction: Transaction) {
    this._transaction = transaction;
    this.isIncoming = Number(this._transaction.transaction.amountCurrency.amount) > 0;
  }

  _transaction: Transaction;
  isIncoming: boolean;
}
