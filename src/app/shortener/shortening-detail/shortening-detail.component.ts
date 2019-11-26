import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getShortening();
  }

  getShortening(): void {
    const shorteningId: string = this.route.snapshot.params['id'];
    const fetchedShortening = this.storageService.getShorteningById(shorteningId);
    if (fetchedShortening) {
      this.shortening = fetchedShortening;
    } else {
      this.redirect('shortener');
    }
  }

  deleteShortening(id: string, name: string): void {
    this.storageService.deleteShortening(id, name);
    this.redirect('shortener');
  }

  redirect(url: string): void {
    this.router.navigate([`/${url}`]);
  }

}
