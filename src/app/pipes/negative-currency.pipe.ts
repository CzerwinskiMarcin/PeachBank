import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'negativeCurrency'
})
export class NegativeCurrencyPipe extends CurrencyPipe {

  transform(value: number | string, currencyCode?: string, display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean, digitsInfo?: string, locale?: string): string | null;
  transform(value: null | undefined, currencyCode?: string, display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean, digitsInfo?: string, locale?: string): null;
  transform(value: number | string, currencyCode?: string, display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean, digitsInfo?: string, locale?: string): string | null {
    const currency = super.transform(value, currencyCode, display, digitsInfo, locale);
    return this.negativeCurrencyTransform(currency);
  }

  private negativeCurrencyTransform(amountCurrency: string): string {
      const isNegativeValue = amountCurrency[0] === '-';

      if (!isNegativeValue) {
        return amountCurrency;
      }

      return `${amountCurrency.slice(1, 2)} -${amountCurrency.slice(2)}`;
  }
}
