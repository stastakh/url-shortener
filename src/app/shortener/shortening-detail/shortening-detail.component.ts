import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shortening } from 'src/app/models/shortening-response.interface';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-shortening-detail',
  templateUrl: './shortening-detail.component.html',
  styleUrls: ['./shortening-detail.component.css']
})
export class ShorteningDetailComponent implements OnInit {
  shortening: Shortening;

  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getShortening();
  }

  getShortening(): void {
    const shorteningId: string = this.route.snapshot.params['id'];
    this.shortening = this.storageService.getShorteningById(shorteningId);
  }

}
