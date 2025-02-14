import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'wll1RmOqXq6EmnvpIusDxwqCOk6JESJg';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this.tagsHistory));
  }

  private loadLocalStorage(): void {
    const historyLocalStorage = localStorage.getItem('history');
    if (!historyLocalStorage) return;
    this._tagsHistory = JSON.parse(historyLocalStorage);

    if (!this._tagsHistory.length) return;
    // this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    if (!tag.length) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((response) => {
        this.gifList = response.data;
      });
  }
}
