import { Component, EventEmitter, Output} from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatAutocompleteModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  @Output() searchTerm = new EventEmitter<string>()

  onSearch(value: string) {
    this.searchTerm.emit(value.trim().toLowerCase())
  }
}