import { Component, OnInit } from '@angular/core';
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

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      this.storageService.saveShortening(res.result);
      this.updateShortenings();
    });
  }

  updateShortenings(): void {
    this.shortenings = this.storageService.getShortenings();
  }

  onDeleteShortener(id: string): void {
    this.storageService.deleteShortening(id);
    this.updateShortenings();
  }
}
