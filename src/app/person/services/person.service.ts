import { Person } from './../models/person';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    base_url = 'http://localhost:8080/person';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'accept': 'text/plain',
            'Content-Type': 'text/plain',
            responseType: 'text'
        })
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                'message frombacked ${error.status}, ' +
                'backend body : ${error.error.doRegister}');
        }
        return throwError(
            'Oops something went wrong, please try again later.');
    };

    doRegister(person: Person) {
        console.log(this.base_url);
        const httpOptions = {
            responseType: 'test' as 'json'
        };
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.http.post<any>(this.base_url + "/doregister?fullName=" + person.fullName + "&idNumber=" + person.IdNumber, person, httpOptions);
    }

    downloadReport() {
        const httpOptions = {
            responseType: 'arraybuffer' as 'json'
        };

        return this.http.get<any>(this.base_url + "/devreport", httpOptions)
    }

    getAll(): Observable<Person> {
        return this.http
            .get<Person>(this.base_url + "/getallpeople")
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

}