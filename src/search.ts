/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchResultDto, SearchResultItemFragmentDto } from './data/data-provider';
import { NavigationInstruction, RouteConfig } from 'aurelia-router';
import { DataProvider } from 'data';

class Query {
  q = '';
  withCherry;
  withApple;
}

export class Search {
  
  model: Query = new Query() ;
  displayModel: any = {};

  data: SearchResultDto;
  toggle: boolean = false; 

  private async activate(params: any, _: RouteConfig, navigationInstruction: NavigationInstruction): Promise<void> {
    this.displayModel.searchFor = JSON.stringify(params);
    this.displayModel.router = JSON.stringify(navigationInstruction.queryParams);
    
    setTimeout(()=> {
      this.model.q = navigationInstruction.queryParams?.q;
      this.model.withApple =  (navigationInstruction.queryParams?.withApple === 'on'? true:false); 
      this.model.withCherry = (navigationInstruction.queryParams?.withCherry === 'on'? true:false);
    }, 500);
    
    if (navigationInstruction.queryParams?.q?.length > 0) {
      const dataProvider: DataProvider = new DataProvider();
      this.data = await dataProvider.getSearchResults(navigationInstruction.queryParams.q, 10, 1);
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

  toggleFilters() {
    console.log('1111111')
  }
}
