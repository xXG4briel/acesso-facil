import { Component, Input } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'modal-visito-info.html',
})
export class ModalExampleComponent {

  @Input() visit: any;

  files = [
    { name: 'Nota fiscal.pdf' },
    { name: 'Layout técnico.pdf' },
    { name: 'RG.pdf' },
  ]

  constructor(private modalCtrl: ModalController) {
  }

  downloadFile(file: any) {

  }

  cancel() {
    return this.modalCtrl.dismiss();
  }
}
