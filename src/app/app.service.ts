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
  private todosApi: string = 'https://jsonplaceholder.typicode.com/todos';

  private postSelected: Subject<number> = new Subject<number>();
  public postSelected$ = this.postSelected.asObservable();
  public setPostSelected(id: number): void {
    this.postSelected.next(id);
  }

  constructor(private http: HttpClient) { }

  posts$ = this.http.get<Post[]>(this.postApi).pipe(shareReplay());
  users$ = this.http.get<User[]>(this.userApi).pipe(shareReplay());
  comments$ = this.http.get<Comment[]>(this.commentsApi).pipe(shareReplay());
  todos$ = this.http.get<Todo[]>(this.todosApi).pipe(shareReplay());

  postsWithComments$ = combineLatest([
    this.posts$,
    this.comments$,
  ]).pipe(
    shareReplay(),
    map(([posts, comments]) => {
      return posts.map(
        (p) =>
        ({
          ...p,
          comments: comments.filter((c) => c.postId === p.id),
        } as unknown as Post)
      );
    })
  );

  usersWithTodos$ = combineLatest([this.users$, this.todos$]).pipe(
    map(([users, todos]) => {
      return users.map(
        (u) =>
        ({
          ...u,
          todos: todos.filter((t) => t.userId === u.id),
        } as unknown as User)
      );
    })
  );
  usersWithPostsAndComments$ = combineLatest([this.usersWithTodos$, this.postsWithComments$]).pipe(
    map(([users, posts]) => {
      return users.map((u) => {
        const postsForUser = posts.filter((p) => p.userId === u.id);
        return {
          ...u,
          posts: postsForUser,
        } as unknown as User;
      });
    }),
    tap((data) => console.log('data', data))
  );

  selectedPost$ = combineLatest([
    this.postSelected$,
    this.postsWithComments$,
  ]).pipe(
    map(([postId, posts]) => {
      return posts.find((p) => p.id === postId) as Post;
    })
  );
}
