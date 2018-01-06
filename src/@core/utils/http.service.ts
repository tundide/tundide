// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Output, EventEmitter } from '@angular/core';

// @Injectable()
// export class HttpService {
//   @Output() errorOccurred = new EventEmitter();

//   private host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

//   constructor(public http: HttpClient) { }

//   post(url, body) {
//     const jsonbody = JSON.stringify(body);
//     let token = localStorage.getItem('token');
//     const headers = new HttpHeaders({ 'Authorization': token, 'Content-Type': 'application/json' });
//     return this.http.post(this.host + url, jsonbody, { headers: headers });
//   }

//   patch(url, body) {
//     const jsonbody = JSON.stringify(body);
//     let token = localStorage.getItem('token');
//     const headers = new HttpHeaders({ 'Authorization': token, 'Content-Type': 'application/json' });
//     return this.http.patch(this.host + url, jsonbody, { headers: headers });
//   }

//   delete(url) {
//     let token = localStorage.getItem('token');
//     const headers = new HttpHeaders({ 'Authorization': token, 'Content-Type': 'application/json' });
//     return this.http.delete(this.host + url, { headers: headers });
//   }


//   get(url) {
//     let token = localStorage.getItem('token');
//     const headers = new HttpHeaders({ 'Authorization': token, 'Content-Type': 'application/json' });
//     return this.http.get<HttpHeaders>(this.host + url, { headers: headers });
//   }

//   response(response: Response) {
//     if (response.status === 204) {
//       return {
//         status: 204
//       };
//     }
//     return response.json();
//   }

//   catch(response: Response) {
//     const res = response.json();
//     this.errorOccurred.emit(res);
//     return Observable.throw(res);
//   }
// }