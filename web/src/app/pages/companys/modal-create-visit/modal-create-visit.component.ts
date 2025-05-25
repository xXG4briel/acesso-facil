import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CompanysService } from 'src/app/services/companys.service';

@Component({
  selector: 'app-modal-create-visit',
  templateUrl: './modal-create-visit.component.html',
  styleUrls: ['./modal-create-visit.component.scss'],
})
export class ModalCreateVisitComponent  implements OnInit {

  form: FormGroup;

  @Input() createVisitSubmit: (value: unknown) => void;;

  constructor(
    private modalCtrl: ModalController, 
    private companyService: CompanysService,
    private alertService: AlertService,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const current = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(current.getDate() + 1);

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      startDate: [current.toISOString().substring(0, 16), Validators.required],
      endDate: [tomorrow.toISOString().substring(0, 16), Validators.required],
    });
  }


  closeModal(){ 
    this.modalCtrl.dismiss();
  }  
}
