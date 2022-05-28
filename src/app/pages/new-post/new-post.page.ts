import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  form: FormGroup;
  selectedImagePreview: any;
  selectedImage: any;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onImagePick(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedImage = event.target.files[0];

      // For preview only
      const reader = new FileReader();
      reader.onload = () => this.selectedImagePreview = reader.result;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSave() {
    const formValue = this.form.value;
    const data = new FormData();

    data.append('image', this.selectedImage);
    data.append('title', formValue.title);
    data.append('description', formValue.description);
    console.log(data);

    // upload to server
    this.postService.addPost(data).subscribe(() => this.router.navigate(['/posts']));

  }
}
