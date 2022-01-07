import { TestBed } from '@angular/core/testing';
import { TransactionService } from './services/transaction.service';
import { AccountService } from './services/account.service';
import { AppComponent } from './app.component';
import { Account } from './interfaces/account.interface';

describe('AppComponent', () => {
  let component: AppComponent;
  let transactionService: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [TransactionService, AccountService]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    transactionService = TestBed.inject(TransactionService);
  });


  it('should evoke add transaction with new transaction that contains passed parameters', () => {
    const spy = spyOn(transactionService, 'addTransaction');
    const account: Account = {amountCurrency: {currencyCode: 'EUR', amount: '10'}, name: 'Test'};
    const dummyData: {targetAccount: string, amount: string} = {targetAccount: 'TargetTest', amount: '10'};

    component.onMakeTransaction(dummyData);

    const transaction = spy.calls.mostRecent().args[0];

    expect(spy).toHaveBeenCalled();
    expect(transaction.getMerchantName()).toEqual(dummyData.targetAccount);
    expect(transaction.getAmountCurrency().amount).toEqual(`-${dummyData.amount}`);

  });

});

