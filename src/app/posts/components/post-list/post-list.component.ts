import { Component } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.less']
})
export class PostListComponent {

  posts$ = this.appService.postsWithUser$;
  postSelectedAction = this.appService.postSelected$;
  postsWithUserAndComments$ = this.appService.postsWithUserAndComments$;
  selectedPost$ = this.appService.selectedPost$;
  

  constructor(private appService: AppService) {}
  onSelected(postId: number): void {
    this.appService.setPostSelected(postId);
  }
}
