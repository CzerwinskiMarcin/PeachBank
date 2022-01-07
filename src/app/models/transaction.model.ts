import { ITransaction } from '../interfaces/transaction.interface';
import { AmountCurrency } from '../interfaces/amount-currenct.interface';

enum TransactionType {
  CRDT = 'CRDT',
  DBIT = 'DBIT'
}

export class Transaction {

  constructor(private transaction: ITransaction) {}

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

  getId(): string {
    return this.transaction.id;
  }

  isIncoming(): boolean {
    return this.transaction.transaction.creditDebitIndicator === TransactionType.CRDT;
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
      case TransactionType.DBIT:
        return {
          amount: `-${amountCurrency.amount}`,
          currencyCode: amountCurrency.currencyCode
        };
      case TransactionType.CRDT:
        return amountCurrency;
      default:
        throw new Error(`unsupported transaction code: ${creditDebitIndicator}`);
    }
  }
}
