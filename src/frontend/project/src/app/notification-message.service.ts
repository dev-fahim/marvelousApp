import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private is_fired = new BehaviorSubject(false);
  get_status = this.is_fired.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  ch_is_fired(value: boolean) {
    this.is_fired.next(value)
  }
}
