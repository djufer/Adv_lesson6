import { Component } from '@angular/core';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { AuthorizedStatusService } from 'src/app/shared/services/authorized-status.service';



@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent {
  constructor(
    private modalService: ModalsService,
    private blogDataService: BlogDataService,
    private authorizedStatusService: AuthorizedStatusService
  ) {}
  public regModalStatus = false;
  

  closeRegModal() {
    this.modalService.closeRegModal();
  }

  // ----Перевірка правильності введення полів
  public userNamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
  public emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  public passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  // -----------------------------------------
    //  вводи інпутів
  public userName!: string;
  public email!: string;
  public password!: string;
  addUser() {
    if (
      this.emailPattern.test(this.email) &&
      this.userNamePattern.test(this.userName) &&
      this.passwordPattern.test(this.password)
    ) {
        this.blogDataService.addUser(this.userName, this.email, this.password);
    } else {
      alert('Неправильно заповнені поля');
    }
  }
}
