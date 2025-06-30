import { Injectable } from '@angular/core';
import { Projection } from '../models/projection.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectionService {
  private projections: Projection[] = [];

  constructor() {
    const stored = localStorage.getItem('projections');
    if (stored) {
      this.projections = JSON.parse(stored);
    } else {
      this.seedMockData();
    }
  }

  private save() {
    localStorage.setItem('projections', JSON.stringify(this.projections));
  }

  getAllProjections(): Projection[] {
    return [...this.projections]; 
  }

  getProjectionById(projectionId: number): Projection | undefined {
    return this.projections.find(p => p.projectionId === projectionId);
  }

  getProjectionByMovieId(movieId: number): Projection[] {
    return this.projections.filter(p => p.movieId === movieId);
  }

  addProjection(projection: Projection): void {
    projection.projectionId = Date.now();
    this.projections.push(projection);
    this.save();
  }

  deleteProjection(projectionId: number): void {
    this.projections = this.projections.filter(p => p.projectionId !== projectionId);
    this.save();
  }
  private seedMockData() {
    const locations = ['Sala 1', 'Sala 2', 'Sala 3'];
    const prices = [400, 450, 500];

    let id = 1;

    for (let movieId = 1; movieId <= 50; movieId++) {
        for (let i = 0; i < 3; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i + movieId); 

        const projection: Projection = {
            projectionId: id++,
            movieId,
            dateTime: date.toISOString(),
            location: locations[i % locations.length],
            price: prices[i % prices.length],
            seats: 60,
            reserved: Math.floor(Math.random() * 10)
        };

        this.projections.push(projection);
        }
    }

    this.save();
}
}
