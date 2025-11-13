import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { VisitorsService } from 'src/app/services/visitors.service';

@Component({
  selector: 'app-visitors-approval',
  templateUrl: './visitors-approval.page.html',
  styleUrls: ['./visitors-approval.page.scss'],
})
export class VisitorsApprovalPage implements OnInit {

  success: boolean = false;
  loading: boolean = false;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly alertService: AlertService,
    private readonly visitorsService: VisitorsService
  ) { }

  async ngOnInit() {
    const { id } = this.activateRoute.snapshot.params;
    const { approve } = this.activateRoute.snapshot.queryParams;
    if(id) {
      const loading = await this.alertService.showLoading();
      this.loading = true;

      this.visitorsService.approval(id, approve || 'n')
      .subscribe({
        next: (value) => {
          this.loading = false;
          this.success = true;
          loading.dismiss();
        },
        complete: () => {},
        error: (value) => {
          this.alertService.alert({ header: 'Erro', message: 'Não foi possível aprovar a visita.' })
          this.loading = false;
          loading.dismiss();
        }
      });
    }
  }

}
