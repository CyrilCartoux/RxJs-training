import { Todo } from './models/todo';
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
  private todosApi: string = "https://jsonplaceholder.typicode.com/todos";

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

  todos$ = this.http.get<Todo[]>(this.todosApi).pipe( 
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
    shareReplay(),
    map(([posts, comments]) => {
      return posts.map((p) => ({
        ...p,
        comments: comments.filter((c) => c.postId === p.id)
      } as unknown as Post))
    })
  )

  usersWithTodos$ = combineLatest(this.users$, this.todos$).pipe(
    map(([users, todos]) => {
      return users.map((u) => ({
        ...u,
        todos: todos.filter((t) => t.userId === u.id)
      }) as unknown as User)
    })
  )
  selectedPost$ = combineLatest(this.postSelected$, this.postsWithUserAndComments$).pipe(
    map(([postId, posts]) => {
      return posts.find((p) => p.id === postId) as Post;
    })
  );

}
