import { Post } from './../../../models/post';
import { Component } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrls: ["./post-list.component.less"]
})
export class PostListComponent {

  usersWithPostsAndComments$ = this.appService.usersWithPostsAndComments$;
  selectedPost$ = this.appService.selectedPost$;
  showComments: boolean = false;
  openPostId: number;

  constructor(private appService: AppService) { }
  onPostSelected(postId: number): void {
    this.appService.setPostSelected(postId);
  }
  onShowComments(post: Post) {
    this.showComments = !this.showComments;
    this.openPostId = post.id;
  }
}
