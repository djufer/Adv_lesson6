import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthorizedStatusService {
  private authorizedStatusSubject = new BehaviorSubject<boolean>(false);
  public authorizedStatus$ = this.authorizedStatusSubject.asObservable();

  changeAuthorizedStatus(status: boolean): void {
    this.authorizedStatusSubject.next(status);
  }

  getAuthorizedStatus(): Observable<boolean> {
    return this.authorizedStatus$;
  }
}
