import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend.service';
import { LeavableRoute } from '../leavable.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, LeavableRoute {

  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private beSvc: BackendService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['', Validators.required]
    })
  }

  async createPost() {
    const newPosting = {
      title: this.form.get('title').value,
      body: this.form.get('body').value,
      tags: this.form.get('tags').value,
      user_id: this.authSvc.getUser(),
      author: this.authSvc.getProfileName()
    }
    const result = await this.beSvc.createNewPost(newPosting)
    if(result.status == 200) {
      console.log(result)
      this.form.reset();
      this.router.navigate(['/posting', result.postId]);
    }
    else {
      alert('An error has occurred while uploading your post.')
    }
  }

  hashTagInvalid(): boolean {
    const hashTagValues = this.form.get('tags').value.toString();
    if(hashTagValues.includes('#') && hashTagValues.length > 1) {
      return false;
    }
    else {
      return true;
    }
  }

  isFormInvalid(): boolean {
    return this.form.invalid || this.hashTagInvalid()
  }

  canILeave() {
    return (!this.form.dirty);
  }
}
