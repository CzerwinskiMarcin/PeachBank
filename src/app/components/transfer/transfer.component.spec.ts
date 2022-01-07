import { TransferComponent } from './transfer.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NegativeCurrencyPipe } from '../../pipes/negative-currency.pipe';
import { Account } from '../../interfaces/account.interface';

describe('TransferComponent', () => {
  const account: Account = {
    amountCurrency: {
      currencyCode: 'EUR',
      amount: '1'
    },
    name: 'Dummy'
  };

  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NegativeCurrencyPipe]
    });

    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    component.account = account;

    fixture.detectChanges();
  });

  it('should show modal after evoking openModal', () => {
    component.showConfirmation = false;
    component.openModal();

    expect(component.showConfirmation).toBeTrue();
  });

  it('should hide after evoking closeModal', () => {
    component.showConfirmation = true;
    component.closeModal();

    expect(component.showConfirmation).toBeFalse();
  });

  it('should show modal on submit', () => {
    component.showConfirmation = false;

    component.handleSubmit();

    expect(component.showConfirmation).toBeTrue();
  });

  describe('confirmTransaction', () => {
    it('should close modal', () => {
      component.showConfirmation = true;

      component.confirmTransaction();

      expect(component.showConfirmation).toBeFalse();
    });

    it('should evoke reset form', () => {
      const spy = spyOn(component, 'resetForm');

      component.confirmTransaction();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit event', () => {
      const spy = spyOn(component.makeTransaction, 'emit');

      component.confirmTransaction();

      expect(spy).toHaveBeenCalled();
    });
  });
});
