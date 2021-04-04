import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router } from 'aurelia-router';
  
  export class App {
    router: Router;
  
    configureRouter(config: RouterConfiguration, router: Router): void {
      this.router = router;
      config.title = 'NGCS Search';
      config.options.pushState = true;
      config.options.root = '/';
      config.options.compareQueryParams = true;
      config.map([
        { route: ['', 'search'], name: 'search', moduleId: PLATFORM.moduleName('search')},
        { route: ['', 'search*'], name: 'search', moduleId: PLATFORM.moduleName('search')}
      ]);
    }
    
  }
  

  