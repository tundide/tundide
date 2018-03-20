import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from './user.model';
import { StorageService } from '../@core/utils/storage.service';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Manage user authentication and session.
 * @module AuthService
 */
@Injectable()
export class MochAuthService {
    /**
     * Event fired when user authenticated
     * @event      onSignin.
     */
    @Output() onSignin: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when user logout
     * @event      onLogout.
     */
    @Output() onLogout: EventEmitter<any> = new EventEmitter();

    /**
     * Event fired when user data is loaded
     * @event      onUserDataLoad.
     */
    @Output() onUserDataLoad: EventEmitter<any> = new EventEmitter();

    constructor(public http: HttpClient,
    ) { }

    /**
     * Validate is the user is authenticated or not
     * @returns      True or False.
     */
    loggedIn() {
        return true;
    }

    /**
     * Load User Data on start page
     * @returns       Objet "User" with UserId - Name - Email - Token - First Income.
     */
    loadUserData(token: string) {
        return this.http.get<User>('/auth/userdata');
    }

    /**
     * Confirm registered user
     */
    confirm(userid: string) {
        return this.http.patch<User>('/auth/confirm', { 'userid': userid });
    }

    /**
     * Get User Credentials from SessionStorage
     * @returns       Object "User" with UserId - Name - Email - Token.
     */
    getUserCredentials() {
        return {
            pendientedehacer: ''
        };
    }

    /**
     * Signin with JWT
     * @param  {string} email email of the user
     * @param  {string} password password of the user
     */
    signin(email: string, password: string) {
        let usr = {
            email: email,
            password: Md5.hashStr(password)
        };

        return this.http.post('/auth/signin', usr);
    }

    /**
     * Signout with JWT
     * @param  {string} name Name of the user
     * @param  {string} email email of the user
     * @param  {string} password password of the user
     */
    signout(name: string, email: string, password: string, token: string) {
        let usr = {
            email: email,
            password: Md5.hashStr(password),
            token: token
        };

        return this.http.post('/auth/signout', usr);
    }

    /**
     * Logout User
     */
    logout() {
        let user = this.getUserCredentials();
        this.onLogout.emit();
    }
}