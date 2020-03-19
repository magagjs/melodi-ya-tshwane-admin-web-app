import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressLoaderService {

  public isInProgress = new BehaviorSubject(false);
  constructor() { }
}
