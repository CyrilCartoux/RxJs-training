import { Component } from '@angular/core';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-posts',
  templateUrl: './post-list.component.html',
  styleUrls: ["./post-list.component.less"]
})
export class PostListComponent {

  postsWithUserAndComments$ = this.appService.postsWithUserAndComments$;
  selectedPost$ = this.appService.selectedPost$;


  constructor(private appService: AppService) { }
  onPostSelected(postId: number): void {
    this.appService.setPostSelected(postId);
  }
}
