import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  // readonly ROOTURL: string = 'http://35.233.209.172';
  readonly URL: string = 'https://flask-api-243101.appspot.com';

  constructor() { }
}
