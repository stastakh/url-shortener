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

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.updateShortenings();
  }

  onSubmit(): void {
    if (!this.url) {
      return;
    }

    this.loading = true;

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      const shortening: Shortening = res.result;
      shortening.name = this.shorteningName;
      this.storageService.saveShortening(shortening);
      this.updateShortenings();
    });
  }

  updateShortenings(): void {
    this.shortenings = this.storageService.getShortenings();
    this.loading = false;
  }

  onDeleteShortener(id: string, name: string): void {
    this.storageService.deleteShortening(id, name);
    this.updateShortenings();
  }
}
