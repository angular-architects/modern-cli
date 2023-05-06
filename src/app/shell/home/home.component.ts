import { Component, inject } from "@angular/core";
import { LoggerService } from "../../shared/util-logger";
import { UtilAuthService } from "@demo/util-auth";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  logger = inject(LoggerService);
  authService = inject(UtilAuthService);

  constructor() {
    this.authService.login('Jane');

    this.logger.debug('home', 'My Debug Message');    
    this.logger.info('home', 'My Info Message');    
    this.logger.error('home', 'My Error Message');   
  }
}
