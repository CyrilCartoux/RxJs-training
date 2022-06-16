import { Component} from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppService } from './app.service';
import { Post } from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  posts$ = this.appService.postsWithUser$;
  postSelectedAction = this.appService.postSelected$;
  postsWithUserAndComments$ = this.appService.postsWithUserAndComments$;

  selectedPost$ = combineLatest(this.postSelectedAction, this.postsWithUserAndComments$).pipe(
    map(([postId, posts]) => {
      return posts.find((p) => p.id === postId) as Post;
    })
  );

  constructor(private appService: AppService) {}
  onSelected(postId: number): void {
    this.appService.setPostSelected(postId);
  }
}
