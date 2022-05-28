import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onRegister() {
    const loading = await this.loadingCtrl.create({ message: 'Loading...' });
    await loading.present();
    this.authService.register(this.form.value).pipe(take(1)).subscribe(async () => {
      await loading.dismiss();
      this.router.navigateByUrl('/login');
    });
  }
}
