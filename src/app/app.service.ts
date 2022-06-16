import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mapTo, shareReplay, tap } from 'rxjs/operators';
import { Post } from './models/post';
import { combineLatest, Subject } from 'rxjs';
import { User } from './models/user';
import { Comment } from './models/comment';

@Injectable({ providedIn: 'root' })
export class AppService {
  private postApi: string = 'https://jsonplaceholder.typicode.com/posts';
  private userApi: string = 'https://jsonplaceholder.typicode.com/users';
  private commentsApi: string = 'https://jsonplaceholder.typicode.com/comments';

  private postSelected: Subject<number> = new Subject<number>();
  public postSelected$ = this.postSelected.asObservable();
  public setPostSelected(id: number): void {
    this.postSelected.next(id);
  }

  constructor(private http: HttpClient) { }

  posts$ = this.http.get<Post[]>(this.postApi).pipe(
    tap((data) => (data.length = 15)),
    shareReplay()
  );

  users$ = this.http.get<User[]>(this.userApi).pipe(
    tap((data) => (data.length = 10)),
    shareReplay()
  );

  comments$ = this.http.get<Comment[]>(this.commentsApi)
    .pipe(
      tap(data => data.length = 35),
      shareReplay()
    )

  postsWithUser$ = combineLatest(this.posts$, this.users$).pipe(
    map(([posts, users]) => {
      return posts.map(
        (p) =>
        ({
          ...p,
          userId: users.find((u) => p.userId === u.id).name,
        } as unknown as Post)
      );
    })
  );
  postsWithUserAndComments$ = combineLatest(
    this.postsWithUser$,
    this.comments$
  ).pipe(
    map(([posts, comments]) => {
      return posts.map((p) => ({
        ...p,
        comments: comments.filter((c) => c.postId === p.id)
      } as unknown as Post))
    }),
    tap(data => console.log('data :>> ', data))
  )
    
}
