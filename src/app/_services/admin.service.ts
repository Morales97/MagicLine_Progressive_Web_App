import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class AdminService {

    constructor(private http : HttpClient){}

    getUsers(url){
        return this.http.get(url)   
    }

    getTrams(url){
        return this.http.get(url)   
    }

    eraseAllData(url){
        return this.http.get(url)   
    }
}