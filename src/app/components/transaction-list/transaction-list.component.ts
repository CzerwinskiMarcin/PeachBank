import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent implements OnInit, OnDestroy {
  @Input() transactions: Array<Transaction> = [];
  @Output() filterByMerchantName: EventEmitter<string> = new EventEmitter();

  filter: FormControl = new FormControl('');
  filterSub: Subscription;

  ngOnInit(): void {
    this.filterSub = this.filter.valueChanges
      .pipe(
        tap(name => this.filterByMerchantName.emit(name))
      )
      .subscribe();
  }

  trackTransactionBy(index: number, transaction: Transaction): string {
    return transaction.getId();
  }

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
  }
}
