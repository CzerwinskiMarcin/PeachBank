import { ITransaction } from '../interfaces/transaction.interface';
import { Transaction } from './transaction.model';

describe('TransactionModel', () => {
  let mockRawTransactionData: ITransaction;

  beforeEach(() => {
    mockRawTransactionData = {
      transaction: {
        type: '',
        creditDebitIndicator: '',
        amountCurrency: {
          amount: '',
          currencyCode: ''
        }
      },
      id: '',
      categoryCode: '',
      dates: {
        valueDate: ''
      },
      merchant: {
        name: '',
        accountNumber: ''
      }
    };

  });

  describe('getAmountCurrency', () => {
    it('should return negative amount if creditDebitIndicator indicates it', () => {
      mockRawTransactionData.transaction.creditDebitIndicator = 'DBIT';
      mockRawTransactionData.transaction.amountCurrency.amount = '1';
      const transaction = new Transaction(mockRawTransactionData);

      expect(transaction.getAmountCurrency().amount).toEqual('-1');
    });

    it('should return positive amount if creditDebitIndicator indicates it', () => {
      mockRawTransactionData.transaction.creditDebitIndicator = 'CRDT';
      mockRawTransactionData.transaction.amountCurrency.amount = '1';
      const transaction = new Transaction(mockRawTransactionData);

      expect(transaction.getAmountCurrency().amount).toEqual('1');
    });
  });

  describe('isIncoming', () => {
    it('should return true for CRDT creditDebitIndicator', () => {
      mockRawTransactionData.transaction.creditDebitIndicator = 'CRDT';
      const transaction = new Transaction(mockRawTransactionData);

      expect(transaction.isIncoming()).toBeTrue();
    });

    it('should return false for DBIT creditDebitIndicator', () => {
      mockRawTransactionData.transaction.creditDebitIndicator = 'DBIT';
      const transaction = new Transaction(mockRawTransactionData);

      expect(transaction.isIncoming()).toBeFalse();
    });
  });
});
