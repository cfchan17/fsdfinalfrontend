import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { Posting } from './interfaces';

@Injectable()
export class BackendService {
    constructor(private http: HttpClient, private authSvc: AuthService) { }

    createNewPost(newPost: Posting) {
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})
        return this.http.post<any>('/api/create', newPost, {observe: 'response', headers: header})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return {status: 200, postId: result.body._id};
                }
            })
            .catch(err => {
                return err;
            })
    }

    getOnePost(postId: string) {
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})

        const params = new HttpParams().set("postId", postId);
        return this.http.get<any>("/api/posting", {observe: 'response', headers: header, params: params})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return result;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    getUserProfile(userId:string) {
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})
        return this.http.get<any>(`/api/user/${userId}`, {observe: 'response', headers: header})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return result;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    getUserFollowers(userId:string) {
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})
        return this.http.get<any>(`/api/user/followers/${userId}`, {observe: 'response', headers: header})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return result;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    getUserFollowing(userId:string) {
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})
        return this.http.get<any>(`/api/user/following/${userId}`, {observe: 'response', headers: header})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return result;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    getPostsByUser(userId:string) {
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})
        return this.http.get<any>(`/api/all_postings/${userId}`, {observe: 'response', headers: header})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return result;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    searchPosts(searchString:string) {
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})
        return this.http.post<any>("/api/search/", {searchString}, {observe: 'response', headers: header})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return result;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    newFollow(userId:string) {
        const currentUser = this.authSvc.getUser()
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})
        return this.http.post<any>("/api/follow/", {currentUser, followUser: userId}, {observe: 'response', headers: header})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return result;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    newUnfollow(userId:string) {
        const currentUser = this.authSvc.getUser()
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})
        return this.http.post<any>("/api/unfollow/", {currentUser, followUser: userId}, {observe: 'response', headers: header})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return result;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }

    getWeather(country:string) {
        const token = this.authSvc.getToken();
        const header = new HttpHeaders({"Authorization": `Bearer ${token}`})

        const params = new HttpParams().set("country", country);
        return this.http.get<any>("/api/weather", {observe: 'response', headers: header, params: params})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    return result;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }
}