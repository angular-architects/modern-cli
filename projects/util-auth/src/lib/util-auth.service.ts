import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilAuthService {
  userName = new BehaviorSubject<string>('');

  login(userName: string): void {
    // Login for honest users TM
    this.userName.next(userName);
  }
}
