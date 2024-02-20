
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private _router: Router) {
    }
    canActivate(): boolean {

        const tokenData = localStorage.getItem('token');
        if (tokenData == null || tokenData == '') {
            this._router.navigate(['home']);
            return false;
        }
        return true;
    }

}