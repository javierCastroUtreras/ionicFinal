import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(private authService: AuthService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  async onLogin() {
    const loading = await this.loadingCtrl.create({ message: 'Authenticanting...' });
    await loading.present();
    this.authService.login(this.form.value).pipe(take(1)).subscribe(() => {
      loading.dismiss();
    })
  }
}
