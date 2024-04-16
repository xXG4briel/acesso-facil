import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private readonly alertController: AlertController,
    private readonly loadingCtrl: LoadingController,
  ) { }

  async alert({ header, message }: { header: string, message: string }) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok'],
    });

    await alert.present();
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
    });

    loading.present();

    return loading;
  }
}
