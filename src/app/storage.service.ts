import { Injectable } from '@angular/core';
import { Shortening } from './models/shortening-response.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  shortenings: Shortening[] = [];

  constructor() {
    this.shortenings = this.getShortenings();
  }

  saveShortening(shortening: Shortening): void {
    this.shortenings.push(shortening);
    this.updateStorage(this.shortenings);
  }

  getShortenings(): Shortening[] {
    const shorteningsString = localStorage.getItem('shortenings');

    if (!shorteningsString) {
      return [];
    }

    try {
      return JSON.parse(shorteningsString);
    } catch {
      return [];
    }
  }

  updateStorage(shortenings: Shortening[]): void {
    localStorage.setItem('shortenings', JSON.stringify(shortenings));
  }

  deleteShortening(shortId: string, shortName: string): void {
    // check user confirmation on deleting shortening
    const question = `Do you really want to delete this shortening: ${shortName}`;
    const userConfirmation: boolean = confirm(question);
    if (userConfirmation) {
      // filter shortenings
      this.shortenings = this.getShortenings().filter(
        shortening => shortening.code !== shortId
      );
      // update storage with filtered shortnings
      this.updateStorage(this.shortenings);
    }
  }
}
