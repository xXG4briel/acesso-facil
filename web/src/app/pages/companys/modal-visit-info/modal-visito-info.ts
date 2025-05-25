import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CompanysService } from 'src/app/services/companys.service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'modal-visito-info.html',
})
export class ModalExampleComponent {

  @Input() visit: any;
  @Input() updateVisitSubmit: (id: string, value: unknown) => void;

  form: FormGroup;

  files = [
    { name: 'Nota fiscal.pdf' },
    { name: 'Layout técnico.pdf' },
    { name: 'RG.pdf' },
  ]

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private companyService: CompanysService, private readonly alertService: AlertService, private visitsService: VisitsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      startDate: [this.visit.startDate?.substring(0,16)],
      endDate: [this.visit.endDate?.substring(0,16)],
    });
  }

  downloadFile(file: any) {

  }

  cancel() {
    return this.modalCtrl.dismiss();
  }
}
