import { PostListComponent } from './components/post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PostItemComponent } from './components/post-item/post-item.component';



@NgModule({
  declarations: [
    PostListComponent,
    PostItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PostRoutingModule,
    // Material
    MatDividerModule,
    MatCardModule
  ]
})
export class PostsModule { }
