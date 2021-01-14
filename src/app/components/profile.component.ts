import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend.service';
import { Posting, User } from '../interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {
    user_id: '',
    fullname: '',
    dob: '',
    email: '',
    country: '',
    profile_name: '',
    profile_pic: '',
    profile_quote: ''
  }

  postings: Posting[] = [];

  viewingOwnProfile = false;
  alreadyFollowed = false;

  userFollowers: number = 0;
  userFollowing: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private beSvc: BackendService, private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    const user_id = this.activatedRoute.snapshot.params.user_id;
    const currentUser = this.authSvc.getUser()

    if(user_id == currentUser) {
      this.viewingOwnProfile = true;
    }

    if(!this.viewingOwnProfile) {
      this.beSvc.getUserFollowing(currentUser)
        .then(result => {
          for(let i =0; i < result.body.length; i++) {
            if(result.body[i].follow_id == user_id) {
              this.alreadyFollowed = true;
              break;
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    this.beSvc.getUserProfile(user_id)
      .then(result => {
        console.log(result)
        this.user = result.body
      })
      .catch(err => {
        console.log(err)
      })

    this.beSvc.getUserFollowers(user_id)
      .then(result => {
        this.userFollowers = result.body.length
      })
      .catch(err => {
        console.log(err)
      })

    this.beSvc.getUserFollowing(user_id)
      .then(result => {
        this.userFollowing = result.body.length
      })
      .catch(err => {
        console.log(err)
      })

    this.beSvc.getPostsByUser(user_id)
      .then(result => {
        this.postings = result.body;
      })
      .catch(err => {
        console.log(err)
      })
  }

  async follow() {
    const result = await this.beSvc.newFollow(this.user.user_id);
    if(result.status == 200) {
      this.alreadyFollowed = true;
    }
    else {
      alert('Action failed')
    }
  }

  async unfollow() {
    const result = await this.beSvc.newUnfollow(this.user.user_id);
    if(result.status == 200) {
      this.alreadyFollowed = false;
    }
    else {
      alert('Action failed')
    }
  }
}
