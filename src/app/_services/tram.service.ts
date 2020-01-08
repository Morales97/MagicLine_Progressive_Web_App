import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class TramService {

    constructor(private http : HttpClient){}
    
    getAPIdata(){
        return this.http.get('https://reqres.in/api/users')   
    }

    getOwnTram(){
        return this.http.get('http://localhost:3000/ownTram')   
    }

    openTram(num_id){
        return this.http.post('http://localhost:3000/openTram/' + num_id.toString(), {})
    }

    closeTram(num_id){
        return this.http.post('http://localhost:3000/closeTram/' + num_id.toString(), {})
    }
}