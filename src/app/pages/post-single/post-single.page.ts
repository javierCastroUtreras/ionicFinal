import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.page.html',
  styleUrls: ['./post-single.page.scss'],
})
export class PostSinglePage implements OnInit {
  baseUrl = 'http://localhost/api_ionic';
  postId: number;
  post$: Observable<Post>;
  comments$: Observable<any[]>;
  commentCtrl = new FormControl('', [Validators.required]);
  userId = this.authService.user.id;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.postId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.post$ = this.postService.getById(this.postId);
    this.comments$ = this.postService.getPostComments(this.postId);
  }

  onPostComment() {
    if (this.commentCtrl.invalid) return;
    this.postService
      .postPostComment(this.postId, this.commentCtrl.value)
      .subscribe(() => {
        this.commentCtrl.reset();
        this.comments$ = this.postService.getPostComments(this.postId);
      });
  }

  onPostDelete() {
    this.postService.deletePost(this.postId).subscribe(() => {
      this.router.navigate(['/posts']);
    });
  }

  onPostEdit() {
    this.router.navigate(['/edit-post', this.postId]);
  }
}
