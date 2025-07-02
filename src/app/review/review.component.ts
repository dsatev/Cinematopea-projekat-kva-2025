import { NgForOf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [MatInputModule, NgForOf, MatFormFieldModule, FormsModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']   
})
export class ReviewComponent {
  rating = 0
  comment = ''

  constructor(
    public dialogRef: MatDialogRef<ReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movieTitle: string }
  ) { }

  setRating(r: number) {
    this.rating = r;
  }

  submit() {
    if(this.rating === 0 || !this.comment) return

    this.dialogRef.close({
      rating: this.rating,
      comment: this.comment
    })
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
