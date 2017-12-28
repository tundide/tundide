import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { User } from './user.model';
import { HttpService } from '../@core/utils/http.service';
import { SocketService } from '../shared/socket.service';
import { Md5 } from 'ts-md5/dist/md5';

/**
 * Manage user authentication and session.
 * @module AuthService
 */
@Injectable()
export class AuthService {
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

    private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    constructor(public http: Http,
        private httpService: HttpService,
        private socketService: SocketService,
    ) { }

    /**
     * Validate is the user is authenticated or not
     * @returns      True or False.
     */
    loggedIn() {
        // TODO: Validar que el token no se haya vencido
        let token = localStorage.getItem('token');

        if (token) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Load User Data on start page
     * @returns       Objet "User" with UserId - Name - Email - Token - First Income.
     */
    loadUserData(token: string): Observable<User> {
        return this.httpService.get('/auth/userdata')
            .map((response: Response) => {
                const result = response.json();
                return new User(result.data.name, result.data.username, result.data.shortId, result.data.id,
                    result.data.roles, result.data.firstIncome);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
     * Confirm registered user
     */
    confirm(userid: string): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.patch(this.host + '/auth/confirm', { 'userid': userid }, { headers: headers })
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
     * Complete user registration
     */
    complete(userid: string): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.patch(this.host + '/auth/complete', { 'userid': userid }, { headers: headers })
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
     * Get User Credentials from SessionStorage
     * @returns       Object "User" with UserId - Name - Email - Token.
     */
    getUserCredentials() {
        let userJson = sessionStorage.getItem('user');

        return JSON.parse(userJson);
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

        const body = JSON.stringify(usr);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.host + '/auth/signin', body, { headers: headers })
            .map((response: Response) => {
                const result = response.json();
                localStorage.setItem('token', result.data);
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
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

        const body = JSON.stringify(usr);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.host + '/auth/signout', body, { headers: headers })
            .map((response: Response) => {
                return this.httpService.response(response);
            })
            .catch((error: Response) => {
                return this.httpService.catch(error);
            });
    }

    /**
     * Logout User
     */
    logout() {
        let user = this.getUserCredentials();
        this.socketService.logout(user.shortId);
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        this.onLogout.emit();
    }
}