import { AppService } from './../../../app.service';
import { Observable } from 'rxjs';
import { Post } from './../../../models/post';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.less']
})
export class PostItemComponent implements OnInit {

  showDetail: boolean = false;

  @Input() post: Post;

  @Output() selected: EventEmitter<number> = new EventEmitter<number>();
  selectedPost$: Observable<Post> = this.appService.selectedPost$;

  constructor(private appService: AppService) { }

  ngOnInit(): void {

  }
  onSelected(postId: number): void {
    this.showDetail = !this.showDetail;
    this.selected.emit(this.showDetail ? postId : null);
  }

}
