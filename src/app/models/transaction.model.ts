import { ITransaction } from '../interfaces/transaction.interface';
import { AmountCurrency } from '../interfaces/amount-currenct.interface';

enum TransactionType {
  CRDT = 'CRDT',
  DBIT = 'DBIT'
}

export class Transaction {

  constructor(private transaction: ITransaction) {}

  getId(): string {
    return this.transaction.id;
  }

  isIncoming(): boolean {
    return Number(this.transaction.transaction.amountCurrency.amount) > 0;
  }

  getDate(): string | number {
    return this.transaction.dates.valueDate;
  }

  getMerchantName(): string {
    return this.transaction.merchant.name;
  }

  getType(): string {
    return this.transaction.transaction.type;
  }

  getAmountCurrency(): AmountCurrency {
    const {transaction: {amountCurrency, creditDebitIndicator}} = this.transaction;

    switch (creditDebitIndicator) {
      case TransactionType.CRDT:
        return {
          amount: `-${amountCurrency.amount}`,
          currencyCode: amountCurrency.currencyCode
        };
      case TransactionType.DBIT:
        return amountCurrency;
      default:
        throw new Error(`unsupported transaction code: ${creditDebitIndicator}`);
    }
  }

  static createOutgoing(merchantName: string, amountCurrency: AmountCurrency): Transaction {
    return new Transaction({
      transaction: {
        type: '',
        creditDebitIndicator: TransactionType.DBIT,
        amountCurrency
      },
      dates: {
        valueDate: Date.now()
      },
      merchant: {
        name: merchantName,
        accountNumber: ''
      },
      id: '',
      categoryCode: ''
    });
  }
}
