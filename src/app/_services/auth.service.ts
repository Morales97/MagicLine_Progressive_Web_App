import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private isAdminSubject: BehaviorSubject<any>;
    public isAdmin: Observable<any>;
    private useFakeBackend: false;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.isAdminSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('isAdmin')));
        this.isAdmin = this.isAdminSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(url, username, password) {
        if(this.useFakeBackend){
        // FAKE LOG IN
            return this.http.post<any>('http://localhost:4200/users/authenticate', { username, password })
                .pipe(map(user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                }));
        } else {
        // REAL LOG IN TO REST API
            return this.http.post<any>(url, { username, password })
                .pipe(map(user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('isAdmin', JSON.stringify(user.isAdmin));
                    this.currentUserSubject.next(user);
                    this.isAdminSubject.next(user.isAdmin);
                    console.log(user);
                    return user;
                }));
        }
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAdmin');
        this.currentUserSubject.next(null);
        this.isAdminSubject.next(null);
    }
}
