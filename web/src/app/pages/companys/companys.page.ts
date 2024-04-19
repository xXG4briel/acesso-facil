import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { CompanysService } from 'src/app/services/companys.service';

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

  constructor(
    private readonly companyService: CompanysService,
    private readonly alertService: AlertService
  ) { }

  ngOnInit() {
    this.visitorsWaiting = [
      { name: 'Gabriel', role: 'Engenheiro', phone: '+5511912341234', description: '11/01/2024' },
      { name: 'Marcos', role: 'Engenheiro', phone: '+5511912341234', description: '11/01/2024' },
      { name: 'Ayslan', role: 'Engenheiro', phone: '+5511912341234', description: '11/01/2024' },
    ]
    this.visitorsApproved = [
      { name: 'Lucas', role: 'Engenheiro', phone: '+5511912341234', description: '11/01/2024' },
    ]
  }

  onClick(){ }

  segmentChanged(e: any){
    this.type = e.target.value;
  }

  async getVisitors() {
    const loading = await this.alertService.showLoading();

    this.companyService.getVisitors<any>().subscribe({
      next: (value) => {
        this.visitorsWaiting = value.waiting;
        this.visitorsApproved = value.approved;
        this.visitorsReject = value.rejected;
        this.visitorsFinish = value.finished;

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
