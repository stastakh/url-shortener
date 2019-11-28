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
  error: string = '';

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.updateShortenings();
  }

  onSubmit(): void {
    if (!this.url || !this.shorteningName) {
      return;
    }

    this.loading = true;

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      const shortening: Shortening = {
        ...res.result,
        name: this.shorteningName
      };
      this.storageService.saveShortening(shortening);
      this.updateShortenings();
      this.shorteningName = '';
      this.url = '';
    },
      (err) => {
        this.loading = false;
        if (err.status === 400) {
          this.error = 'Invalid URL';
        } else {
          this.error = 'Something went wrong. Please try later.'
        }
      }
    );
  }

  updateShortenings(): void {
    this.shortenings = this.storageService.getShortenings();
    this.loading = false;
    this.error = '';
  }

  onDeleteShortener(id: string, name: string): void {
    this.storageService.deleteShortening(id, name);
    this.updateShortenings();
  }

}
