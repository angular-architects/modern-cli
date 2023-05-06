import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilAuthService } from '@demo/util-auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miles';

  authService = inject(UtilAuthService);

  constructor() {
    this.authService.userName.subscribe(userName => {
      console.log('userName', userName);
    });
  }
}

// Make Lazy Loading easier:
export default AppComponent;