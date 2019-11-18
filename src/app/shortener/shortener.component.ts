import { Component, OnInit } from '@angular/core';
import { ShortenerApiService } from '../shortener-api.service';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  url = '';

  constructor(
    private shortAPI: ShortenerApiService,
  ) { }

  ngOnInit() {}

  onSubmit() {
    if (!this.url) {
      return;
    }

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      console.log({res});
    });
  }
}
