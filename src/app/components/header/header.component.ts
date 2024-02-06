import { Component, OnInit } from '@angular/core';


import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { AuthorizedStatusService } from 'src/app/shared/services/authorized-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthorized: boolean = false;
  public loginModalStatus$ = false;
  public regModalStatus$ = false;
  public postModalStatus$ = true;
  public currentLoginedUserName$!: string;

  constructor(
    private modalService: ModalsService,
    private blogDataService: BlogDataService,
    private authorizedStatusService: AuthorizedStatusService
  ) {}

  ngOnInit(): void {
    this.authorizedStatusService.getAuthorizedStatus().subscribe((status) => {
      this.isAuthorized = status;
    });

    this.modalService.getLoginModalStatus().subscribe((status) => {
      this.loginModalStatus$ = status;
    });
    this.modalService.getRegModalStatus().subscribe((status) => {
      this.regModalStatus$ = status;
    });
    this.modalService.getPostModalStatus().subscribe((status) => {
      this.postModalStatus$ = status;
    });

    this.blogDataService.currentLoginedUserName$.subscribe(
      (currentLoginedUserName$) => {
        this.currentLoginedUserName$ = currentLoginedUserName$;
      }
    );
  }

  openLoginModal(): void {
    this.modalService.openLoginModal();
  }

  openRegModal(): void {
    this.modalService.openRegModal();
  }
  openPostModal(): void {
    this.modalService.updateEditStatus(false);
    this.modalService.openPostModal();
  }

  // --------signOut---------
  signOut() {
    this.isAuthorized = false;
  }
}
