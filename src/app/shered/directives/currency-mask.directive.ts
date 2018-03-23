import { Directive, forwardRef, OnInit, Input, ElementRef, Injector, Optional, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgForm, FormGroupDirective, FormControl, NgControl } from '@angular/forms';

const currencySymbols: { [key: string]: string } = {
  ARS: '$',
  BRL: 'R$',
  CLP: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  USD: '$',
  FGG: '@',
};

@Directive({
  selector: '[appCurrencyMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyMaskDirective),
      multi: true
    }
  ]
})
export class CurrencyMaskDirective implements ControlValueAccessor, OnInit {

  // o símbolo da moeda a ser exibido
  @Input() pvdCurrencyMask: string;
  disabled: boolean;

  parentForm: NgForm | FormGroupDirective;
  formControl: FormControl;

  propagateChange: any;
  propagateTouch: any;

  value: string;

  constructor(
    private el: ElementRef,
    private _injector: Injector,
    @Optional() private _parentForm: NgForm,
    @Optional() private _parentFormGroup: FormGroupDirective,
  ) {
    this.parentForm = _parentFormGroup || _parentForm;
  }

  @HostListener('keypress', ['$event']) applyCurrencyMask(event: KeyboardEvent) {
    const eventTarget = <HTMLInputElement>event.target;

    const patternBeforeComma = /[0-9,]/;
    const patternAfterComma = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    // const eventTarget = <HTMLInputElement>event.target;
    const fieldClean = this.sanitizeValue(eventTarget.value);
    let _replaceCurrencyMask: RegExp;

    switch (true) {
      case (eventTarget.value.indexOf(',') !== -1):
        eventTarget.value = eventTarget.value.replace('.,', ',');

        if (!patternAfterComma.test(inputChar)) {
          // caractere não permitido
          event.preventDefault();
        }

        break;

      case (event.key === ','):
        break;

      default:
        if (!patternBeforeComma.test(inputChar)) {
          // caractere não permitido
          event.preventDefault();
          return;
        }

        if (eventTarget.value.indexOf(this.pvdCurrencyMask) === -1) {
          eventTarget.value = `${this.pvdCurrencyMask} ${eventTarget.value}`;
        }

        eventTarget.value = eventTarget.value.replace(/\./g, '');

        switch (true) {
          case (fieldClean.length + 1 > 4 && (fieldClean.length + 1) % 3 === 2):
            // tslint:disable-next-line:prefer-const
            _replaceCurrencyMask = new RegExp(`(${this.escapeRegexChars(this.pvdCurrencyMask)} \\d{2})([0-9\\.]*)`);

            eventTarget.value = eventTarget.value.replace(_replaceCurrencyMask, '$1.$2');
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');

            break;

          case (fieldClean.length + 1 > 3 && (fieldClean.length + 1) % 3 === 1):
            // tslint:disable-next-line:prefer-const
            _replaceCurrencyMask = new RegExp(`(${this.escapeRegexChars(this.pvdCurrencyMask)} \\d{1})([0-9\\.]*)`);

            eventTarget.value = eventTarget.value.replace(_replaceCurrencyMask, '$1.$2');
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');

            break;

          default:
            eventTarget.value = eventTarget.value = eventTarget.value.replace(/(\d{3})/g, '$1.');

        }

        break;
    }

    if (patternAfterComma.test(inputChar)) {
      this.propagateChange(this.sanitizeValue(eventTarget.value) + event.key);
    }
    eventTarget.value = this.removeCurrecy(eventTarget.value)
  }

  @HostListener('keyup.backspace', ['$event']) propagateCleaning(event: KeyboardEvent) {
    const eventTarget = <HTMLInputElement>event.target;

    this.propagateChange(this.sanitizeValue(eventTarget.value));
  }

  ngOnInit() {
    this.formControl = this._injector.get(NgControl);
    this.disabled = this.pvdCurrencyMask === 'NONE' ? true : false;
    this.pvdCurrencyMask = currencySymbols[this.pvdCurrencyMask] || 'R$';
  }

  writeValue(value: any) {
    if (value) {
      this.formControl.setValue(value);
    }
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this.propagateTouch = fn;
  }

  removeCurrecy(val: string) {
    if (this.disabled) {
      val = val.replace('R$ ', '');
    }
    return val;
  }

  /**
   * Limpa os campos para formato moeda com ponto 
   */
  sanitizeValue(value: string): string {
    return value
      .replace(new RegExp(`${this.escapeRegexChars(this.pvdCurrencyMask)} *`), '')
      .replace(/\./g, '')
      .replace(/%/g, '')
      .replace(',', '.');
  }

  /**
   * Escapa caracteres especiais para Regex
   */
  escapeRegexChars(str: string) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }





}
