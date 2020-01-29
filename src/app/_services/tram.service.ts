import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class TramService {

    constructor(private http : HttpClient){}
    
    getAPIdata(){
        return this.http.get('https://reqres.in/api/users')   
    }

    getOwnTram(url){
        return this.http.get(url)   
    }

    openTram(url, num_id){
        return this.http.post(url + '/' + num_id.toString(), {})
    }

    pasEscombra(url, num_id){
        return this.http.post(url + '/' + num_id.toString(), {})
    }

    closeTram(url, num_id){
        return this.http.post(url + '/' + num_id.toString(), {})
    }
}