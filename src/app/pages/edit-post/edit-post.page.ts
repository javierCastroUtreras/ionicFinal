import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit {
  baseUrl = 'http://localhost/api_ionic';
  form: FormGroup;
  selectedImagePreview: any;
  selectedImage: any;
  postId: any;
  post$: Observable<Post>;
  imageUpdated: boolean;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.postId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.post$ = this.postService.getById(this.postId);
    this.post$.subscribe(post => {
      this.selectedImagePreview = this.baseUrl + '/' + post.image;
      this.form.patchValue({
        title: post.title,
        description: post.description,
      });
      this.form.updateValueAndValidity();
    });
  }

  onImagePick(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];
      this.imageUpdated = true;

      // For preview only
      const reader = new FileReader();
      reader.onload = () => this.selectedImagePreview = reader.result;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onUpdate() {
    const formValue = this.form.value;
    console.log(formValue);
    const data = new FormData();

    if (this.imageUpdated) {
      data.append('image', this.selectedImage);
    }
    data.append('title', formValue.title);
    data.append('description', formValue.description);

    // upload to server
    this.postService.update(data, this.postId).subscribe(() => this.router.navigateByUrl('/posts'));
  }
}
