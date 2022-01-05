import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from '../../interfaces/account.interface';
import { CurrencyPipe } from '@angular/common';
import { NegativeCurrencyPipe } from '../../pipes/negative-currency.pipe';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  @Input() set account(account: Account) {
    const {name, amountCurrency: {amount, currencyCode}} = account;
    this.form.get('account').setValue(`${name}: ${this.currencyPipe.transform(amount, currencyCode, 'symbol', '1.0-2')}`);
  };

  form = new FormGroup({
    account: new FormControl(''),
    targetAccount: new FormControl(''),
    amount: new FormControl('')
  });

  constructor(private currencyPipe: NegativeCurrencyPipe) {
  }

  ngOnInit(): void {
    this.form.get('account').disable();
  }

  handleSubmit(event: any): void {
    console.log('Submit', event);
  }
}
