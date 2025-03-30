import { ValidationErrorPipe } from './validation-error.pipe';
import { FormControl, Validators } from '@angular/forms';

describe('ValidationErrorPipe', () => {
  let pipe: ValidationErrorPipe;

  beforeEach(() => {
    pipe = new ValidationErrorPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array when control is null', () => {
    expect(pipe.transform(null)).toEqual([]);
  });

  it('should return empty array when control has no errors', () => {
    const control = new FormControl('test');
    expect(pipe.transform(control)).toEqual([]);
  });

  it('should return empty array when control has errors but is not touched', () => {
    const control = new FormControl('', [Validators.required]);
    expect(pipe.transform(control)).toEqual([]);
  });

  it('should return error message when control has required error and is touched', () => {
    const control = new FormControl('', [Validators.required]);
    control.markAsTouched();
    expect(pipe.transform(control)).toEqual(['This field is required']);
  });
});
