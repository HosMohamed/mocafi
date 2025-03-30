import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  templateUrl: './cta-button.component.html',
  styleUrl: './cta-button.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CTAButtonComponent {
  @Input() disabled!: boolean;
  @Input() buttonText!: string;
  @Input() buttonClass!: string;
  @Input() errorButton!: boolean;
  @Output() onClick = new EventEmitter<void>();
}
