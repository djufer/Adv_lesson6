import { Injectable, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Blog } from '../interfaces/blog';
import { ModalsService } from './modals.service';
import { AuthorizedStatusService } from 'src/app/shared/services/authorized-status.service';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogDataService {
  public users: Array<User> = [
    {
      id: 1,
      username: 'Admin',
      email: 'admin@ukr.net',
      password: 'Admin1111',
    },
    {
      id: 2,
      username: 'Petro',
      email: 'petya@untracked.net',
      password: 'petko1992',
    },
  ];
  public blogs: Array<Blog> = [];

  // змінна індексу поточного користувача, який відображається у шапці сторінки (header)
  public currentLoginedUserIndex!: number; // номер індексу масиву об'єктів
  // public currentLoginedUserName!: string;  --- можливо цієї змінної і не потрібно буде

  // змінна імені поточного користувача, який відображається у шапці сторінки (header)
  private currentLoginedUserNameSource = new BehaviorSubject<string>('');
  public currentLoginedUserName$ =
    this.currentLoginedUserNameSource.asObservable();
  // ---------------------

  constructor(
    public modalsService: ModalsService,
    public authorizedStatusService: AuthorizedStatusService
  ) {}
  // перевірка на наявність такого користувача в базі, при логінуванні
  checkUser(users: Array<User>, inputEmail: string, inputPassword: string) {
    let user = users.find(
      (u) => u.email === inputEmail && u.password === inputPassword
    );
    if (user) {
      this.authorizedStatusService.changeAuthorizedStatus(true);
      this.currentLoginedUserIndex = users.findIndex(function (element) {
        return element === user;
      });
      this.currentLoginedUserNameSource.next(user.username);
      this.modalsService.closeLoginModal(); //працює
    } else {
      console.log('невірний логін чи пароль');
    }
  }

  // ===================
  //  Додавання юзера (Sign up)
  addUser(userName: string, email: string, password: string): void {
    let findingUserName = this.users.some((obj) => obj.username === userName);
    let findingEmail = this.users.some((obj) => obj.email === email);
    if (findingUserName || findingEmail) {
      alert('Користувач з таким username або email вже існує! Виберіть інший!');
    } else {
      let user: User = {
        id: this.users.length + 1,
        username: userName,
        email: email,
        password: password,
      };
      this.users.push(user);
      this.modalsService.closeRegModal();

      this.authorizedStatusService.changeAuthorizedStatus(true);
      this.currentLoginedUserIndex = this.users.findIndex(function (element) {
        return element === user;
      });
      this.currentLoginedUserNameSource.next(userName);
    }
  }
  // додавання поста
  post(title: string, postText: string) {
    const newPost: Blog = {
      id: this.blogs.length + 1,
      postedBy: this.users[this.currentLoginedUserIndex].username,
      topic: title,
      date: new Date(),
      message: postText,
    };
    this.blogs.push(newPost);
  }

  // редагування поста
  public currentEditBlog!: Blog;
  setCurrentEditBlog(blog: Blog) {
    this.currentEditBlog = blog; 
  }
}
