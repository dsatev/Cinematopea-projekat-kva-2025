import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatFormFieldModule, CommonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    form: FormGroup
    error: string | null = null

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router){
      this.form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: ['', Validators.required],
        favoriteGenres: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
      })
    }

    register() {
      if(this.form.valid){
        const user = {
          ...this.form.value,
          favoriteGenres: this.form.value.favoriteGenres.split(',').map((g: string) => g.trim()),
          id: Date.now()
        }

        const success = this.userService.register(user)
        if(success){
          this.userService.login(user.username, user.password)
        }else{
          this.error = 'Korisnicko ime vec postoji.'
        }
      }
    }

}
