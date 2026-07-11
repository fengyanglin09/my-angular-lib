import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-layout-topnav-example',
  templateUrl: './layout-topnav-example.html',
  styleUrl: './layout-topnav-example.css',
})
export class LayoutTopnavExample {
  readonly notificationCount = input(3);
  readonly workspaceName = input('Learning Workspace');
  readonly menuToggled = output<void>();
}
