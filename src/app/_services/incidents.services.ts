import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class IncidentsServices {

    constructor(private http : HttpClient){}

    getIncident(url, num){
        return this.http.get(url + '/' + num.toString(), {})
    }

    getAllIncidents(url){
        return this.http.get(url)
    }

    solveIncident(url, num_id){
        this.http.post(url + '/' + num_id.toString(), {})
    }

    pasEscombra(url, num_id){
        return this.http.post(url + '/' + num_id.toString(), {})
    }

    closeTram(url, num_id){
        return this.http.post(url + '/' + num_id.toString(), {})
    }
}
