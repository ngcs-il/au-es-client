/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationInstruction, RouteConfig } from 'aurelia-router';

class Query {
  q: string;
  withCherry = false;
  withApple = false;
}

export class Search {
  
  model: Query = new Query() ;
  displayModel: any = {};

  private activate(params: any, _: RouteConfig, navigationInstruction: NavigationInstruction): void {
    this.model.q = params?.q;
    this.model.withApple = <boolean>(params?.withApple == 'on');
    this.model.withCherry = <boolean>(params?.withCherry == 'on');
    this.displayModel.searchFor = params?.q;
    this.displayModel.router = JSON.stringify(navigationInstruction.queryParams);
  }
}
