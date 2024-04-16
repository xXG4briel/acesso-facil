import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

import { CompanysService } from 'src/app/services/companys.service';
import { VisitorsService } from 'src/app/services/visitors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  type: string = 'visitor';
  takePicture: boolean = false;
  photoSaved: boolean = false;
  loading: boolean = false;

  companysForm: FormGroup;
  visitorsForm: FormGroup;

  stream: MediaStream;

  constructor(
    private readonly alertService: AlertService,
    private readonly companysService: CompanysService,
    private readonly visitorssService: VisitorsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.companysForm = this.formBuilder.group({
      password: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      identity: ['', Validators.required],
      identityType: ['cnpj', Validators.required],
      address: this.formBuilder.group({
        city: ['', Validators.required],
        uf: ['', Validators.required],
        address: ['', Validators.required],
        complement: [''],
        zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]]
      })
    });
    this.visitorsForm = this.formBuilder.group({
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      identity: ['', Validators.required],
      identityType: ['cnpj', Validators.required],
      address: this.formBuilder.group({
        city: ['', Validators.required],
        uf: ['', Validators.required],
        address: ['', Validators.required],
        complement: [''],
        zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{3}$')]]
      })
    });
  }
  onClick() {
  }
  segmentChanged(e: any) {
    this.type = e.target.value
  }
  async capture() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if ( !this.takePicture ) {
      this.loading = true;
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.stream = stream;
        video.srcObject = stream;
        video.play();
      })
      .catch( async (error) => {
        await this.alertService.alert({ header: 'Erro', message: error })
      });
      this.loading = false;
    }
    else {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Extrair a imagem do canvas como base64
      // const imageDataURL = canvas.toDataURL('image/png');

      // Exibir a imagem capturada, você pode querer enviá-la para o backend ou fazer mais alguma coisa com ela
      // console.log(imageDataURL);

      await this.alertService.alert({ header: 'Sucesso', message: 'Imagem salva localmente' });

      this.stream.getTracks().forEach(track => track.stop())
      video.srcObject = null;

      this.photoSaved = true;
    }
    this.takePicture = !this.takePicture;
  }

   async submitCompany(): Promise<void> {

    if(this.companysForm.invalid) {
      this.alertService.alert({ header: 'Formulário incorreto', message: 'Verifique o formulário novamente.' })
      return;
    }

    const loading = await this.alertService.showLoading();

    this.companysService.create(this.companysForm.value).subscribe({
      next: (value) => {
        this.alertService.alert({ header: 'Sucesso', message: 'Empresa cadastrada' });
        this.router.navigate(['/login']);
        loading.dismiss();
      },
      error: (err) => {

        const { error } = err;
        loading.dismiss();

        this.alertService.alert({ header: 'Erro', message: error.message })
      }
    })
  }
  async submitVisitor() {
    const canvas = this.canvas.nativeElement;
    const file = canvas.toDataURL('image/png')

    const formData = new FormData();

    if(this.visitorsForm.invalid) {
      this.alertService.alert({ header: 'Formulário incorreto', message: 'Verifique o formulário novamente.' })
      return;
    }

    Object.keys(this.visitorsForm.value).forEach(key => {
      if (key !== 'address') {
        formData.append(key, this.visitorsForm.get(key)?.value);
      } else {
        const address = this.visitorsForm.get('address')?.value;
        formData.append(`address`, JSON.stringify(address));
      }
    });

    const blob = new Blob([file], { type: 'image/png' });

    formData.append('file', blob);


    const loading = await this.alertService.showLoading();
    this.visitorssService.create(formData).subscribe({
      next: (value) => {
        loading.dismiss();
        this.alertService.alert({ header: 'Sucesso', message: 'Empresa cadastrada' });
        this.router.navigate(['/login']);

      },
      error: (err) => {
        loading.dismiss();

        const { error } = err;

        this.alertService.alert({ header: 'Erro', message: error.message })
      }
    })
  }

}
