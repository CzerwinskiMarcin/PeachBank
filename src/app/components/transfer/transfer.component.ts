import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../interfaces/account.interface';
import { NegativeCurrencyPipe } from '../../pipes/negative-currency.pipe';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  @Input() account: Account;
  @Output() makeTransaction: EventEmitter<{ targetAccount: string, amount: string }> = new EventEmitter();

  form: FormGroup;
  showConfirmation: boolean;

  constructor(private currencyPipe: NegativeCurrencyPipe) {
  }

  ngOnInit(): void {
    this.setForm();
    this.form.get('account').disable();
  }

  setForm(): void {
    const {name, amountCurrency: {amount = 0, currencyCode = 'EUR'}} = this.account;

    this.form = new FormGroup({
      account: new FormControl(`${name}: ${this.currencyPipe.transform(amount, currencyCode, 'symbol', '1.0-2')}`),
      targetAccount: new FormControl('', {validators: Validators.required}),
      amount: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/),
          Validators.min(0.1),
          Validators.max(Number(this.account.amountCurrency.amount) + 500)
        ]
      })
    });
  }

  resetForm(): void {
    const targetAccount = this.form.get('targetAccount');
    const amount = this.form.get('amount');

    targetAccount.reset();
    targetAccount.markAsUntouched();
    amount.reset();
    amount.markAsUntouched();
  }

  handleSubmit(): void {
    this.openModal();
  }

  cancelTransaction(): void {
    this.closeModal();
  }

  confirmTransaction(): void {
    this.makeTransaction.emit(this.form.value);
    this.resetForm();
    this.closeModal();
  }

  openModal(): void {
    this.showConfirmation = true;
  }

  closeModal(): void {
    this.showConfirmation = false;
  }

  isFormInvalid(): boolean {
    return this.form.status === 'INVALID';
  }

  getError(formControlName: string): string {
    const control = this.form.get(formControlName);
    const {errors, touched} = control;
    if (!errors || !touched) {
      return '';
    }

    switch (Object.keys(errors)[0]) {
      case 'max':
        return 'To big value';
      case 'required':
        return 'Field required';
      case 'pattern':
      default:
        return 'Invalid value';
    }
  }
}
