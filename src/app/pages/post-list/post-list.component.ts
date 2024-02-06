import { Component } from '@angular/core';
import { BlogDataService } from '../../shared/services/blog-data.service';
import { ModalsService } from 'src/app/shared/services/modals.service';
import { Blog } from 'src/app/shared/interfaces/blog';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {
  public blogs: Array<Blog> = [];
  constructor(
    private blogDataService: BlogDataService,
    private modalsService: ModalsService
  ) {}
  ngOnInit(): void {
    this.blogs = this.blogDataService.blogs;
  }

  delPost(myBlog: Blog) {
    let currentLoginedUserIndex = this.blogDataService.currentLoginedUserIndex;
    let currentLoginedUserName =
      this.blogDataService.users[currentLoginedUserIndex].username;
    if (
      currentLoginedUserName === myBlog.postedBy ||
      currentLoginedUserIndex === 0
    ) {
      console.log('yeeeees');
      // =========================
      let indexToRemove = this.blogDataService.blogs.findIndex(
        (blog) => blog === myBlog
      );
      console.log(indexToRemove);

      // =========================

      if (
        indexToRemove >= 0 &&
        indexToRemove < this.blogDataService.blogs.length
      ) {
        this.blogDataService.blogs.splice(indexToRemove, 1);
      }
    } else {
      alert('Ви не маєте доступу до видалення цього поста');
    }
  }
  editPost(myBlog: Blog) {
    let currentLoginedUserIndex = this.blogDataService.currentLoginedUserIndex;
    let currentLoginedUserName =
      this.blogDataService.users[currentLoginedUserIndex].username;
    if (
      currentLoginedUserName === myBlog.postedBy ||
      currentLoginedUserIndex === 0
    ) {
      // у модалці post змінити кнопку post на edit
      this.modalsService.updateEditStatus(true);
      
      
      // на сервісі blog-service змінюємо значення змінної на вказане мною
      this.blogDataService.setCurrentEditBlog(myBlog);

      this.modalsService.openPostModal();
    }
    else {
      alert("Ви не маєте права редагувати цей пост")
    }
  }
}
