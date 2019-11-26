import { Component, OnInit, OnChanges } from '@angular/core';
import { ShortenerApiService } from '../shortener-api.service';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  url: string = '';
  shorteningName: string = '';
  loading: boolean = false;
  shortenings: Shortening[] = [];
  searchName: string = '';
  searchFailed: boolean = false;
  showCancelSearchBtn: boolean = false;

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.updateShortenings();
  }

  onSubmit(): void {
    if (!this.url || !this.searchName) {
      return;
    }

    this.loading = true;

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      const shortening: Shortening = { ...res.result };
      shortening.name = this.shorteningName;
      this.storageService.saveShortening(shortening);
      this.updateShortenings();
      this.shorteningName = '';
      this.url = '';
    });
  }

  updateShortenings(): void {
    this.shortenings = this.storageService.getShortenings();
    this.loading = false;
    this.searchFailed = false;
  }

  onDeleteShortener(id: string, name: string): void {
    this.storageService.deleteShortening(id, name);
    this.updateShortenings();
  }

  onSearchShortenings(): void {
    this.updateShortenings();
    if (this.searchName) {
      this.showCancelSearchBtn = true;
      // filter needed shortenings
      this.shortenings = this.shortenings.filter(shortening => shortening.name === this.searchName);
      // if array length === 0 - search failed, otherwise it succeed
      this.searchFailed = this.shortenings.length === 0;
    }
  }

  onCancelSearch(): void {
    this.updateShortenings();
    this.showCancelSearchBtn = false;
    this.searchName = '';
  }

}
