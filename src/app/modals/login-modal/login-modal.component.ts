import { Component } from '@angular/core';
import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { User } from 'src/app/shared/interfaces/user';




@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  constructor(
    private modalService: ModalsService,
    private blogDataService: BlogDataService
  ) {}

  public email!: string;
  public password!: string;
  public logUsers!: Array<User>;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.logUsers = this.blogDataService.users;
  }
  
  logIn(): void {
    if (this.email && this.password) {
          this.blogDataService.checkUser(this.logUsers, this.email, this.password);
    }
    else {
      alert('Заповніть всі поля')
    }
  }
  closeLoginModal(): void {
    this.modalService.closeLoginModal();
  }
}
