import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './app-input.component.html',
  styleUrl: './app-input.component.scss',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppInputComponent {
  @Input() label!: string;
  @Input() inputDisabled!: boolean;
  @Input() errorMessages!: string[];
  @Input() control!: FormControl;
}
