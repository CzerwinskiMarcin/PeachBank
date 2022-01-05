import { AmountCurrency } from './amount-currenct.interface';

export interface Transaction {
  id: string;
  merchant: {
    name: string,
    accountNumber: string
  };
  dates: {
    valueDate: string | number
  };
  categoryCode: string;
  transaction: {
    type: string,
    creditDebitIndicator: string,
    amountCurrency: AmountCurrency
  };
}
