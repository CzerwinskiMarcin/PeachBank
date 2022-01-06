import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent implements OnInit {
  @Input() transactions: Array<Transaction> = [];
  @Output() filterByMerchantName: EventEmitter<string> = new EventEmitter();

  filter: FormControl = new FormControl('');

  ngOnInit(): void {
    this.filter.valueChanges
      .pipe(
        tap(name => this.filterByMerchantName.emit(name))
      )
      .subscribe();
  }

  trackTransactionBy(index: number, transaction: Transaction): string {
    return transaction.getId();
  }
}
