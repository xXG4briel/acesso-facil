import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CompanysService } from 'src/app/services/companys.service';
import { VisitsService } from 'src/app/services/visits.service';
import { ModalExampleComponent } from './modal-visit-info';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.page.html',
  styleUrls: ['./companys.page.scss'],
})
export class CompanysPage implements OnInit {

  type: string = 'wait';

  visitorsWaiting: any = []
  visitorsApproved: any = []
  visitorsReject: any = []
  visitorsFinish: any = []

  company: { name: string, avatar: string };
  isMobile: boolean = false;

  constructor(
    private readonly companyService: CompanysService,
    private readonly modalCtrl: ModalController,
    private readonly visitsService: VisitsService,
    private readonly alertService: AlertService,
    private readonly platformService: Platform
  ) { }

  async ngOnInit() {
    this.isMobile = this.platformService.is('mobile') || this.platformService.is('mobileweb');

    this.getCompany();

    await this.getVisits();
  }

  private getCompany() {
    const storage = localStorage.getItem('me');

    this.company = storage ? JSON.parse(storage) : {};

  }

  private async getVisits() {
    const loading = await this.alertService.showLoading();

    this.visitsService.getVisits<{ approved: any[]; finished: any[]; rejected: any[]; waiting: any[]; }>().subscribe({
      next: ({ approved, finished, rejected, waiting }) => {

        this.visitorsApproved = approved;
        this.visitorsFinish = finished;
        this.visitorsReject = rejected;
        this.visitorsWaiting = waiting;

        loading.dismiss();
      },
      error: (err) => {
        const { error } = err;

        loading.dismiss();

        this.alertService.alert({ header: 'Erro', message: error.message });
      }
    });
  }

  async approveVisit(visitId: string, approved = true) {
    const loading = await this.alertService.showLoading();

    this.visitsService.approveVisit(visitId, { approved }).subscribe({
      next: (value) => {
        loading.dismiss();

        this.getVisits();
      },
      error: (err) => {
        const { error } = err;

        loading.dismiss();

        this.alertService.alert({ header: 'Erro', message: error.message });
      }
    })
  }

  async showVisit(visit?: any){

    const modal = await this.modalCtrl.create({
      component: ModalExampleComponent,
      componentProps: {
        visit
      }
    })

    modal.present();

    // console.log(visit)
    // return modal.then((v) => v.)
   }

  async segmentChanged(e: any){
    this.type = e.target.value;
    await this.getVisits()
  }


}
