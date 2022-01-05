import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'number' = 'text';
  @Input() prefix: string;
  @Input() materialPrefix: string;
  @Input() sufix: string;
  @Input() sufixUrl: string;
  @Input() label: string;
  @Input() placeholder = '';

  disabled: boolean;
  touched: boolean;
  value = '';

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string = ''): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  onValueChange(value: string): void {
    console.log('Value change', value);
    this.markAsTouched();
    this.onChange(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
