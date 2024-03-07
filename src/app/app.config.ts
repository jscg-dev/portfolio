import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const APP_STORAGE: InjectionToken<Storage> = new InjectionToken<Storage>('application ls');
export const APP_STORAGE_FACTORY: () => Storage = () => localStorage;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      'provide': APP_STORAGE,
      'useFactory': APP_STORAGE_FACTORY
    }
  ]
};