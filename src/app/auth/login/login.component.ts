import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, RouterModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    form: FormGroup
    error: string | null = null

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router){
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }


    login() {
      if(this.form.valid) {
        const { username, password} = this.form.value
        const success = this.userService.login(username,password)

        if(success){
          this.router.navigate(['/home']).then(() => {
            window.location.reload()
          })   
        }else{
          this.error = 'Pogresno korisnicko ime ili lozinka'
        }
      }
    }
}
