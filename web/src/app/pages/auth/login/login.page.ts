import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  type: "visitors" | "companys" = 'visitors';

  loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly alertService: AlertService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onClick() {
  }
  segmentChanged(e: any) {
    this.type = e.target.value
    this.cleanForm();
  }

  private cleanForm() {
    this.loginForm.patchValue(({ email: '', password: '' }));
    this.loginForm.markAsUntouched();
  }

  async submit() {

    if(this.loginForm.invalid) {
      this.alertService.alert({ header: 'Formulário incorreto', message: 'Verifique o formulário novamente.' })
      return;
    }

    const loading = await this.alertService.showLoading();

    this.authService.login(this.loginForm.value, this.type).subscribe({
      next: (value: any) => {

        localStorage.setItem('access_token', JSON.stringify(value.access_token));
        localStorage.setItem('me', JSON.stringify(value.me));

        this.router.navigate([`/${this.type}`]);

        loading.dismiss();

        this.cleanForm();
      },
      error: (err) => {
        const { error } = err;

        loading.dismiss();

        this.alertService.alert({ header: 'Erro', message: error.message })
      }
    })


  }
}
