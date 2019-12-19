import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class AdminService {

    constructor(private http : HttpClient){}

    getUsers(){
        return this.http.get('http://localhost:3000/users')   
    }

    getTrams(){
        return this.http.get('http://localhost:3000/trams')   
    }
}