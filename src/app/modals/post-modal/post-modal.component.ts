import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogDataService } from 'src/app/shared/services/blog-data.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
})
export class PostModalComponent implements OnInit {
  public editStatus = false;
  public postModalStatus = false;

  public title!: string;
  public postText!: string;

  constructor(
    private modalService: ModalsService,
    private blogDataService: BlogDataService
  ) {}
  ngOnInit(): void {
    this.modalService.editStatus$.subscribe((status: boolean) => {
      this.editStatus = status;
      // Додайте код, який реагує на зміну статусу редагування
      
    });
    if (this.editStatus) {
      const currentEditBlog = this.blogDataService.currentEditBlog;
      if (currentEditBlog) {
        this.title = currentEditBlog.topic;
        this.postText = currentEditBlog.message;
      }
    }
   
  }
  close() {
    this.modalService.closePostModal();
  }
  post() {
    if (this.title && this.postText) {
      this.blogDataService.post(this.title, this.postText);
      // очищення модалки
      this.title = '';
      this.postText = '';
      // закриття модалки
      this.modalService.closePostModal();
    }
    else {
      alert("Заповніть поля")
    }
    
  }
  // ==========================================
  editPost() {
    if (this.title && this.postText) {
      let currentIndex = this.blogDataService.currentEditBlog.id - 1;
      this.blogDataService.blogs[currentIndex].topic = this.title;
      this.blogDataService.blogs[currentIndex].message = this.postText;
      console.log(this.blogDataService.blogs);
      this.modalService.closePostModal();
      
      this.title = '';
      this.postText = '';
    }
    else {
      alert('Поля не можуть бути пустими')
    }
      
  }


 

  // ==========================================
}
