import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() error: string;
  @Input() value = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  disabled: boolean;
  touched: boolean;

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
    this.markAsTouched();
    this.valueChange.emit(value);
    this.onChange(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  showError(): boolean {
    return this.error && this.touched;
  }
}
