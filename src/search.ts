/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { bindable, bindingMode, computedFrom, singleton } from 'aurelia-framework';
import { MDCMenuDistance } from '@material/menu-surface';
import { SearchResultDto, SearchResultItemFragmentDto } from './data/data-provider';
import { NavigationInstruction, RouteConfig, Router } from 'aurelia-router';
import { DataProvider } from 'data';

class Query {
  q = '';
  source = '';
}

@singleton(Search)
export class Search {
  
  query: Query = new Query() ;
  data: SearchResultDto;
  
  searchSources: { key: string, label: string }[] = [
    { 
      key: '',
      label: 'הכול'
    }, { 
      key: 'decissions',
      label: 'החלטות' 
    }, { 
      key: 'protocols',
      label: 'פרוטוקולים'
    }];    
    

  constructor(private router: Router) {}

  search() {
    if (!this.query.q) {
      return;
    }
    
    let fragment = `search/?q=${this.query.q}`;
    for (const key in this.query) {
      if (Object.prototype.hasOwnProperty.call(this.query, key) && key !== 'q' && this.query[key]) {
        fragment += `&${key}=${this.query[key]}`;        
      }
    }
    
    this.router.navigate(fragment, { replace: false, trigger: true });
  }
 
  onMenuSelect(event: { index: number; item: any }, item) { 
    console.log(`Selected Index is ${event.index}. Selected item is ${JSON.stringify(item)}`);
  }

  private searchSourceChanged(): void {
    this.search();
  }

  private async activate(params: any, config: RouteConfig, navigationInstruction: NavigationInstruction): Promise<void> {
        
    if (navigationInstruction.queryParams?.q?.length > 0) {
      const dataProvider: DataProvider = new DataProvider();
      this.data = await dataProvider.getSearchResults(navigationInstruction.queryParams.q, 10, 1);
    } else {
      this.data = undefined;
    }

    this.query.q = navigationInstruction.queryParams?.q;
    this.query.source = navigationInstruction.queryParams ? (navigationInstruction.queryParams.source? navigationInstruction.queryParams.source:'' ): '';
 
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
