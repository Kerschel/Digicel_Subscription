import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly URL: string = 'http://35.230.123.188';
  // readonly URL: string = 'http://127.0.0.1:5000';

  constructor() { }
}
