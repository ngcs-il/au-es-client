/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { singleton } from 'aurelia-framework';
import { SearchResultDto, SearchResultItemFragmentDto } from './data/data-provider';
import { NavigationInstruction, RouteConfig, Router } from 'aurelia-router';
import { DataProvider } from 'data';

class Query {
  q = '';
  withCherry = false;
  withApple = false;
}

@singleton(Search)
export class Search {
  
  model: Query = new Query() ;
  displayModel: any = {};

  data: SearchResultDto;
  static counter = 0;
  constructor(private router: Router) {}

  search() {
    if (!this.model.q) {
      return;
    }
    let fragment = `search/?q=${this.model.q}`;
    if (this.model.withApple) {
      fragment += `&withApple=${this.model.withApple}`;
    }
    if (this.model.withCherry) {
      fragment += `&withCherry=${this.model.withCherry}`;
    }
    this.router.navigate(fragment, { replace: false, trigger: true });
  }

  private async activate(params: any, config: RouteConfig, navigationInstruction: NavigationInstruction): Promise<void> {
    console.log(`Counter: ${Search.counter++}`);
    console.log(JSON.stringify(navigationInstruction.queryParams))
    this.displayModel.searchFor = JSON.stringify(params);
    this.displayModel.router = JSON.stringify(navigationInstruction.queryParams);
    
   
    
    if (navigationInstruction.queryParams?.q?.length > 0) {
      const dataProvider: DataProvider = new DataProvider();
      this.data = await dataProvider.getSearchResults(navigationInstruction.queryParams.q, 10, 1);
    } else {
      this.data = undefined;
    }

    this.model.q = navigationInstruction.queryParams?.q;
    this.model.withApple =  (navigationInstruction.queryParams?.withApple ? true:false); 
    this.model.withCherry = (navigationInstruction.queryParams?.withCherry ? true:false);
 
    if (navigationInstruction.queryParams?.q) {
      this.router.title = navigationInstruction.queryParams.q;
    }
  }

  private getHighlightItemIndex(idx: number, fragment: SearchResultItemFragmentDto): number {
    for ( let i = 0; i < fragment?.highlights?.length; i++) {
      if ( idx + 1 >= fragment?.highlights[i]?.start
        && idx + 1 < fragment?.highlights[i]?.start + fragment?.highlights[i]?.count) {
        return idx;
      }
    }
    return null;
  }
}
