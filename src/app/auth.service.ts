import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {

    private token = '';
    private user_id = '';
    private profileName = '';
    private userCountry = '';

    constructor(private http: HttpClient, private router: Router) { }

    login(username:string, password:string): Promise<boolean> {
        this.token = '';
        return this.http.post<any>('/api/login', {username, password}, {observe: 'response'})
            .toPromise()
            .then(result => {
                if(result.status == 200) {
                    this.token = result.body.token;
                    this.user_id = username;
                    this.profileName = result.body.profileName;
                    this.userCountry = result.body.country;
                    return true;
                }
            })
            .catch(err => {
                if(err.status == 401) {
                    return false;
                }
            })
    }

    isLoggedIn() {
        return this.token != '';
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.isLoggedIn()) {
            return true;
        }
        else {
            return this.router.parseUrl('/login');
        }
    }

    getToken() {
        return this.token;
    }

    getUser() {
        return this.user_id;
    }

    getProfileName() {
        return this.profileName;
    }

    getCountry() {
        return this.userCountry;
    }
}