import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '@eagle009/spaa-angular-lib/src/lib/button/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Button],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-app');
}
