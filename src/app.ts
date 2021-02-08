import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router, activationStrategy } from 'aurelia-router';
  
  export class App {
    router: Router;
  
    configureRouter(config: RouterConfiguration, router: Router): void {
      this.router = router;
      config.title = 'Aurelia';
      config.options.pushState = true;
      config.options.root = '/';
      config.options.compareQueryParams = true;
      config.map([
        { route: ['', 'search/:q?'], name: 'search', moduleId: PLATFORM.moduleName('search'), activationStrategy: activationStrategy.replace }
      ]);
    }
    
  }
  

  