import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend.service';
import { Posting, User } from '../interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user_id:string = '';
  profile_name:string = '';
  postings: Posting[] = [];
  weatherResult;

  constructor(private router: Router, private authSvc: AuthService, private beSvc: BackendService) { }

  ngOnInit(): void {
    this.user_id = this.authSvc.getUser();
    this.profile_name = this.authSvc.getProfileName();

    this.beSvc.getUserFollowing(this.user_id)
      .then(result => {
        for(let i = 0; i < result.body.length; i ++) {
          this.beSvc.getPostsByUser(result.body[i].follow_id)
            .then(result2 => {
              for(let y = 0; y < result2.body.length; y ++) {
                this.postings.push(result2.body[y])
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })

    this.beSvc.getWeather(this.authSvc.getCountry())
      .then(result => {
        console.log(result.body)
        this.weatherResult = result.body;
      })
      .catch(err => {
        console.log(err)
      })
  }

  createPost() {
    this.router.navigate(['/create']);
  }
}
