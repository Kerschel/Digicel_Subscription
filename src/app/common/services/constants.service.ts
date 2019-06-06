import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly ROOTURL: string = 'http://35.233.209.172';
  readonly LOCALURL: string = 'http://127.0.0.1:5000';

  constructor() { }
}
