import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-item-transaction',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionItemComponent {
  @Input() transaction: Transaction;
}
