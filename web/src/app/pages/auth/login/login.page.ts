import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  type: "visitors" | "companys" = 'visitors';

  loginForm: FormGroup;

  constructor(
    private readonly loginService: LoginService,
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
  }

  async submit() {

    if(this.loginForm.invalid) {
      this.alertService.alert({ header: 'Formulário incorreto', message: 'Verifique o formulário novamente.' })
      return;
    }

    const loading = await this.alertService.showLoading();

    this.loginService.login(this.loginForm.value, this.type).subscribe({
      next: (value) => {
        this.router.navigate([`/${this.type}`]);
        loading.dismiss();
      },
      error: (err) => {
        const { error } = err;

        loading.dismiss();

        this.alertService.alert({ header: 'Erro', message: error.message })
      }
    })


  }
}
