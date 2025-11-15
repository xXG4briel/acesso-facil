import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { CompanysService } from 'src/app/services/companys.service';
import { VisitsService } from 'src/app/services/visits.service';
import { ModalExampleComponent } from './modal-visit-info';
import { ModalCreateVisitComponent } from './modal-create-visit';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  loading = false;

  constructor(
    private readonly companyService: CompanysService,
    private readonly modalCtrl: ModalController,
    private readonly visitsService: VisitsService,
    private readonly alertService: AlertService,
    private readonly platformService: Platform,
    private readonly route: Router,
    private readonly authService: AuthService
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

  async getVisits() {
    if(this.loading) return;

    const loading = await this.alertService.showLoading();

    this.loading = true;

    this.visitsService.getVisits<{ approved: any[]; finished: any[]; rejected: any[]; waiting: any[]; }>().subscribe({
      next: (data) => {

        const { approved, finished, rejected, waiting } = data;

        this.visitorsApproved = approved;
        this.visitorsFinish = finished;
        this.visitorsReject = rejected;
        this.visitorsWaiting = waiting;

        loading.dismiss();
        this.loading = false;
      },
      error: (err) => {
        const { error } = err;

        loading.dismiss();
        this.loading = false;

        this.alertService.alert({ header: 'Erro', message: error.message });
      }
    });
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }

  async approveVisit(visitId: string, approved = true) {
    this.loading = true;
    const loading = await this.alertService.showLoading();

    this.visitsService.approveVisit(visitId, { approved }).subscribe({
      next: (value) => {
        loading.dismiss();

        this.loading = false;
        this.getVisits();
      },
      error: (err) => {
        const { error } = err;
        this.loading = false;
        loading.dismiss();

        this.alertService.alert({ header: 'Erro', message: error.message });
      }
    })
  }

  async createVisitSubmit(value: unknown){
    this.loading = true;
    const loading = await this.alertService.showLoading();
    this.companyService.createVisit(value).subscribe({
      next: async (value) => {
        this.alertService.alert({ header: 'Sucesso', message: 'Visita criada com sucesso' });
        this.modalCtrl.dismiss();
        this.loading = false;
        loading.dismiss();
      },
      error: (err) => {
        this.alertService.alert({ header: 'Erro', message: `Não foi possível criar a visita. ${err.error.message}` });
        this.loading = false;
        loading.dismiss();
      },
      complete: async() => {
        this.loading = false;
        this.getVisits(); // to do validar se funfa
        loading.dismiss();
      }
    });
  }

  async createVisit() {
    const modal = await this.modalCtrl.create({
      component: ModalCreateVisitComponent,
      componentProps: {
        createVisitSubmit: this.createVisitSubmit,
        loading: this.loading
      }
    })

    modal.present();
  }

  async showVisit(visit?: any){
    const modal = await this.modalCtrl.create({
      component: ModalExampleComponent,
      componentProps: {
        visit,
        updateVisitSubmit: this.updateVisitSubmit
      }
    })

    modal.present();
  }

  updateVisitSubmit(id: string, value: unknown){
    this.companyService.updateVisit(id, value).subscribe({
      next: async (value) => {
        this.alertService.alert({ header: 'Sucesso', message: 'Visita atualizada com sucesso' });
        this.modalCtrl.dismiss();
        this.loading = false;
        await this.getVisits();
      },
      error: (err) => {
        this.alertService.alert({ header: 'Erro', message: `Não foi possível atualizar a visita. ${err.error.message}` });
      },
      complete: async() => {
      }
    });
  }

  async segmentChanged(e: any){
    if(!this.loading) {
      this.type = e.target.value;
      // await this.getVisits()
    }
  }


}
