import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://api.shrtco.de/v2';

@Injectable({
  providedIn: 'root'
})
export class ShortenerApiService {
  constructor(
    private http: HttpClient,
  ) {}

  shortenUrl(url: string): Observable<any> {
    return this.http.get(`${BASE_URL}/shorten?url=${url}`);
  }
}
