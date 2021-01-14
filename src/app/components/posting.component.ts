import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { Posting } from '../interfaces';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.css']
})
export class PostingComponent implements OnInit {
  posting:Posting = {
    title: '',
    body: '',
    tags: '',
    author: '',
    user_id: '',
    datetime: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private beSvc: BackendService, private router: Router) { }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.params.postId;
    this.beSvc.getOnePost(postId)
      .then(result => {
        this.posting = result.body as Posting
      })
      .catch(err => {
        console.log(err)
      })
  }

}
