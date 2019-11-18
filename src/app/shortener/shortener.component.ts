import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  url = '';

  constructor() { }

  ngOnInit() {}

  onSubmit() {
    if (!this.url) {
      return;
    }

    // process url
  }
}
