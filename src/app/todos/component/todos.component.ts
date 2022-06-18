
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.less']
})
export class TodosComponent implements OnInit {

  users$: Observable<User[]> = this.appService.usersWithTodos$;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

}
