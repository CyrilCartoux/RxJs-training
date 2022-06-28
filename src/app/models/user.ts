import { Post } from './post';
import { Todo } from './todo';
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: number;
      geo: {
        lat: number;
        lng: number;
      };
    };
    phone: number;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
    posts: Post[];
    todos: Todo[]
}
