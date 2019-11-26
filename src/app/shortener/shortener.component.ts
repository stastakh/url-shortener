import { Component, OnInit, OnChanges } from '@angular/core';
import { ShortenerApiService } from '../shortener-api.service';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute
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
  }

  onDeleteShortener(id: string, name: string): void {
    this.storageService.deleteShortening(id, name);
    this.updateShortenings();
  }

  onSearchShortenings(event: Event): void {
    this.searchFailed = false;
    this.updateShortenings();
    if (this.searchName) {
      // filter needed shortenings
      this.shortenings = this.shortenings.filter(shortening => shortening.name === this.searchName);
      // if array length === 0 - search failed, otherwise it succeed
      this.searchFailed = this.shortenings.length === 0;
    }
  }

}
