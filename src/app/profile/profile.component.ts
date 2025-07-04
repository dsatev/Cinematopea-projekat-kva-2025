import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports:[MatFormFieldModule, ReactiveFormsModule, CommonModule, MatInputModule, MatButtonModule] ,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  form: FormGroup
  currentUser: User | null = null
  

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''], 
      favoriteGenres: [''],
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser()
    if (!this.currentUser) {
      this.router.navigate(['/login'])
      return
    }

    this.form.patchValue({
      ...this.currentUser,
      favoriteGenres: (this.currentUser.favoriteGenres || []).join(', ')
    })
  }

  save() {
    if (!this.currentUser) return;

    const updatedUser: User = {
      ...this.currentUser,
      ...this.form.value,
      favoriteGenres: this.form.value.favoriteGenres
        .split(',')
        .map((g: string) => g.trim())
        .filter((g: string) => g !== '')
    };

    this.userService.updateProfile(updatedUser)
    alert('Profil je uspešno sačuvan.')
  }

}
