import { Injectable } from '@angular/core';

// Definim variables globals
@Injectable()
export class Globals {

    // per utilitzar en local
    // readonly baseAPIUrl: string = 'http://localhost:3000';

    // per utilitzar AWS
    readonly baseAPIUrl: string = 'http://ec2-18-222-209-174.us-east-2.compute.amazonaws.com/api';

    // local, HTTPS
    //readonly baseAPIUrl: string = 'https://localhost:3000';
}
