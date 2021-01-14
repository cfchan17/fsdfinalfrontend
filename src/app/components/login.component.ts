import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.errorMessage = '';
  }

  async authenticate() {
    const result = await this.authService.login(this.form.get('username').value, this.form.get('password').value);
    if(result) {
      this.router.navigate(['/']);
    }
    else {
      this.errorMessage = 'Incorrect username and password';
    }
  }
}
