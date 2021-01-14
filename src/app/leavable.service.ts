import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";

export interface LeavableRoute {
    canILeave(): boolean | Promise<boolean>
}

@Injectable()
export class LeavableService implements CanDeactivate<LeavableRoute> {
    canDeactivate(comp: LeavableRoute, currRoute: ActivatedRouteSnapshot,
                  currState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
        if(!comp.canILeave()) {
            return confirm('Are you sure you wish to leave?');
        }
        else {
            return true;
        }
    }
}