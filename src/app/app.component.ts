import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFlowModule } from './user-flow/user-flow.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserFlowModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'mocafi';
}
