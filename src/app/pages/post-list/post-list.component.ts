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

  delPost(index: number) {
    let currentLoginedUserIndex = this.blogDataService.currentLoginedUserIndex;
    let currentLoginedUserName =
      this.blogDataService.users[currentLoginedUserIndex].username;
    if (
      currentLoginedUserName === this.blogDataService.blogs[index].postedBy ||
      currentLoginedUserIndex === 0
    ) {
      if (
        index >= 0 &&
        index < this.blogDataService.blogs.length
      ) {
        this.blogDataService.blogs.splice(index, 1);
      }
    } else {
      alert('Ви не маєте доступу до видалення цього поста');
    }
  }
  editPost(index: number) {
    let currentLoginedUserIndex = this.blogDataService.currentLoginedUserIndex;
    let currentLoginedUserName =
      this.blogDataService.users[currentLoginedUserIndex].username;
    if (
      currentLoginedUserName === this.blogDataService.blogs[index].postedBy ||
      currentLoginedUserIndex === 0
    ) {
      // у модалці post змінити кнопку post на edit
      this.modalsService.updateEditStatus(true);

      // на сервісі blog-service змінюємо значення змінної на вказане мною
      this.blogDataService.setCurrentEditBlog(
        this.blogDataService.blogs[index]
      );

      this.modalsService.openPostModal();
    } else {
      alert('Ви не маєте права редагувати цей пост');
    }
  }
}
