import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Posting } from '../interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  form:FormGroup;
  postings: Posting[] = [];

  constructor(private fb: FormBuilder, private beSvc: BackendService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      searchTerm: ['', Validators.required]
    })
  }

  isFormInvalid(){
    return this.form.invalid || this.hashTagInvalid()
  }

  hashTagInvalid(): boolean {
    const hashTagValues = this.form.get('searchTerm').value.toString();
    if(hashTagValues.includes('#') && hashTagValues.length > 1) {
      return false;
    }
    else {
      return true;
    }
  }

  async search() {
    const result = await this.beSvc.searchPosts(this.form.get('searchTerm').value)
    this.postings = result.body
  }
}
