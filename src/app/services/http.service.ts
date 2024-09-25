import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WikipediaArticle } from '../interfaces/wikipedia.interface';

const WIKI_URL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=&formatversion=2&srsearch=Angular&srprop=sectiontitle|sectionsnippet|snippet|timestamp";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http = inject(HttpClient);

  getWikipediaInfo(): Observable<WikipediaArticle[]> {
    return this.http.get(WIKI_URL) as Observable<WikipediaArticle[]>;
  }

}
