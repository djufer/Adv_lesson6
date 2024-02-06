import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';


@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  //  модалка логінування
  public loginModalStatusSource = new BehaviorSubject<boolean>(false);
  loginModalStatus$ = this.loginModalStatusSource.asObservable();

  openLoginModal(): void {
    
    this.loginModalStatusSource.next(true);
    this.loginModalStatus$ = this.loginModalStatusSource.asObservable();
  }
  closeLoginModal(): void {
    this.loginModalStatusSource.next(false);
  }
  getLoginModalStatus(): Observable<boolean> {
    return this.loginModalStatus$;
  }
  // --------

  // модалка реєстрації
  public regModalStatusSource = new BehaviorSubject<boolean>(false);
  regModalStatus$ = this.regModalStatusSource.asObservable();

  openRegModal(): void {
    this.regModalStatusSource.next(true);
    this.regModalStatus$ = this.regModalStatusSource.asObservable();
  }
  closeRegModal(): void {
    this.regModalStatusSource.next(false);
  }
  getRegModalStatus(): Observable<boolean> {
    return this.regModalStatus$;
  }

  // ----модалка додавання поста

  public postModalStatusSource = new BehaviorSubject<boolean>(false);
  postModalStatus$ = this.postModalStatusSource.asObservable();
  public currentEditedBlog!: number; // індекс поста, який редагується.
  openPostModal(): void {
    this.postModalStatusSource.next(true);
    this.postModalStatus$ = this.postModalStatusSource.asObservable();
  }
  closePostModal(): void {
    this.postModalStatusSource.next(false);
  }
  getPostModalStatus(): Observable<boolean> {
    return this.postModalStatus$;
  }
  //  статус редагування поста
  private editStatusSubject = new BehaviorSubject<boolean>(false);
  editStatus$ = this.editStatusSubject.asObservable();

  updateEditStatus(status: boolean): void {
    this.editStatusSubject.next(status);
  }
  

  
}
