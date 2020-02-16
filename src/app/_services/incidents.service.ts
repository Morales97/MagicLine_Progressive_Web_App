import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class IncidentsService {

    constructor(private http : HttpClient){}

    getIncident(url, num){
        return this.http.get(url + '/' + num.toString(), {})
    }

    getAllIncidents(url){
        return this.http.get(url)
    }

    solveIncident(url, _id){
        return this.http.post<any>(url, {_id})
    }

    submitNewIncident(url, description, category, tram_num){
        return this.http.post<any>(url, {description, category, tram_num})
    }

}
