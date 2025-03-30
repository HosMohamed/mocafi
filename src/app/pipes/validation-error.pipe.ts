import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import _ from 'lodash';

const ERROR_MESSAGES: Record<string, string> = {
  unknown: '',
  required: 'This field is required',
  email: 'Please enter a valid email',
  minlength: 'A minimum length of 8 characters is required',
  pattern: 'Gender should either be Male or Female',
  min: 'A minimum length of 8 characters is required',
};

@Pipe({
  name: 'validationError',
  standalone: true,
  pure: false,
})
export class ValidationErrorPipe implements PipeTransform {
  transform(control: FormControl | null | undefined): string[] {
    const inputErrors = [];

    if (!control) {
      return [];
    }

    const errors: ValidationErrors | null = control.errors;
    if (!errors) {
      return [];
    }

    if (control.touched && !_.isEmpty(control.errors) && errors) {
      for (const key of Object.keys(errors)) {
        if (ERROR_MESSAGES[key]) {
          inputErrors.push(ERROR_MESSAGES[key]);
        }
      }
    }

    return inputErrors;
  }
}
