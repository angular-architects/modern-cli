import { LayoutModule } from '@angular/cdk/layout';
import {
  provideHttpClient,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { provideLogger } from './app/shared/util-logger';
import { TicketsModule } from './app/domains/ticketing/feature-my-tickets';
import { loggerConfig } from './app/logger.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      // withInterceptors([authInterceptor]),
    ),

    provideRouter(
      APP_ROUTES,
      // withPreloading(PreloadAllModules)
    ),

    provideLogger(loggerConfig),

    provideAnimations(),

    importProvidersFrom(TicketsModule),
    importProvidersFrom(LayoutModule),
  ],
});
