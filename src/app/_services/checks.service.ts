import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class ChecksService {

    constructor(private http : HttpClient){}
    
    getAPIdata(){
        return this.http.get('https://reqres.in/api/users')   
    }
}