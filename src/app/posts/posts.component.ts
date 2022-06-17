import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less']
})
export class PostsComponent {

  posts$ = this.appService.postsWithUser$;
  postSelectedAction = this.appService.postSelected$;
  postsWithUserAndComments$ = this.appService.postsWithUserAndComments$;
  selectedPost$ = this.appService.selectedPost$;
  

  constructor(private appService: AppService) {}
  onSelected(postId: number): void {
    this.appService.setPostSelected(postId);
  }
}
