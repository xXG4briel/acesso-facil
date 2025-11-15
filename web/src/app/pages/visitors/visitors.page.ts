import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Companys } from 'src/app/models';
import { Visit, Visits } from 'src/app/models';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompanysService } from 'src/app/services/companys.service';
import { VisitorsService } from 'src/app/services/visitors.service';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.page.html',
  styleUrls: ['./visitors.page.scss'],
})
export class VisitorsPage implements OnInit {

  @ViewChild('files') files: ElementRef;

  type = 'wait';
  visit: Visit;

  visitForm: FormGroup;

  visitor: { name: string, avatar: string };

  visitorsWaiting: Visit[] = [];
  visitorsApproved: Visit[] = [];
  visitorsReject: Visit[] = [];
  visitorsFinish: Visit[] = [];

  companys: Companys[] = [];

  selectedFiles: any;

  form = false;

  constructor(
    private readonly activateRoute: ActivatedRoute,
    private readonly route: Router,
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService,
    private readonly companyService: CompanysService,
    private readonly visitsService: VisitsService,
    private readonly authService: AuthService
  ) {
    this.visitForm = this.formBuilder.group({
      companyId: ['', Validators.required ],
      description: ['', Validators.required ],
      startDate: ['', Validators.required ],
      endDate: ['', Validators.required ]
    })
  }

  ngOnInit() {
    this.getVisitor();

    const { id } = this.activateRoute.snapshot.params;
    if(id) {
      this.getCompany();

      this.form = true;
      if(/new/.test(id)) {
      }
      else {
        this.getVisit(id);
      }
    }
    else {
      this.getVisits();
    }

  }

  back() {
    this.route.navigate(['visitors']);
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }

  getVisitor() {
    const storage = localStorage.getItem('me');
    this.visitor = storage ? JSON.parse(storage) : {};
  }

  async getVisits() {
    const loading = await this.alertService.showLoading();

    this.visitsService.getVisitsByVisitors<Visits>().subscribe({
      next: (data) => {
        loading.dismiss();

        const { approved, finished, rejected, waiting } = data;

        this.visitorsWaiting = waiting;
        this.visitorsApproved = approved;
        this.visitorsReject = rejected;
        this.visitorsFinish = finished;
      },
      error: (err) => {
        loading.dismiss();

        const { error } = err;

        this.alertService.alert({ header: 'Erro', message: error.message })
      }
    })
  }
  async getVisit(id: string) {
    const loading = await this.alertService.showLoading();

    this.visitsService.getVisit<Visit>(id).subscribe({
      next: (visit) => {
        loading.dismiss();
        this.visit = visit;

        const value = {
          startDate: (visit?.startDate?.split('.') || [''])[0],
          endDate: (visit?.endDate?.split('.') || [''])[0],
          description: visit.description,
          companyId: visit.companyId
        }

        this.visitForm.patchValue(value);

      },
      error: (err) => {
        loading.dismiss();

        const { error } = err;

        this.alertService.alert({ header: 'Erro', message: error.message })
      }
    })
  }

  onFilesSelected(event: any) {
    const files = event.target.files as FileList; // FileList ✔️
  
    this.selectedFiles = Array.from(files); // File[] ✔️
  }
  
  
  async submit() {


    if(this.visit && this.visit.id) {
      const loading = await this.alertService.showLoading();

      // if (!this.selectedFile) {
      //   await this.alertService.alert({ header: 'Erro', message: 'Arquivo não selecionado' });
      //   return;
      // }

      this.visitsService.uploadAll(this.visit.id, this.selectedFiles).subscribe({
        next: () => {
          loading.dismiss();
          this.alertService.alert({ header: 'Sucesso', message: 'Atualizado com sucesso' });
        },
        error: (err) => {
          loading.dismiss();

          const { error } = err;

          this.alertService.alert({ header: 'Erro', message: error.message })
        }
      })
    }
    else {

      if(this.visitForm.invalid) {
        this.alertService.alert({ header: 'Formulário incorreto', message: 'Verifique o formulário novamente.' });
        return;
      }

      const formData = new FormData();

      const el = this.files.nativeElement;
      const files: FileList = el.files;
      const names = [];
      for(let i = 0; i < files.length; i++) {
        const file = files[i]
        names.push({ name: file.name });
        const blob = new Blob([file], { type: file.type })
        formData.append('files', blob, file.name);
      }

      this.visit = {
        ...this.visit,
        files: names
      };
      Object.keys(this.visitForm.value).forEach(key => {
        formData.append(key, this.visitForm.get(key)?.value);
      });

      const loading = await this.alertService.showLoading();
      loading.dismiss();

      this.visitsService.postVisit<Visit>(formData).subscribe({
        next: (value) => {
          this.visit = value;
          loading.dismiss();
          this.alertService.alert({ header: 'Sucesso', message: 'Criado com sucesso' });
        },
        error: (err) => {
          loading.dismiss();

          const { error } = err;

          this.alertService.alert({ header: 'Erro', message: error.message })
        }
      })
    }
  }

  onFileSelected(event: any) {

  }

  getCompany() {
    this.companyService.findAll<Companys>().subscribe({
      next: (companys) => {
        this.companys = companys;
      },
      error: (err) => {
        const { error } = err;

        this.alertService.alert({ header: 'Erro', message: error.message })
      }
    })
  }
  segmentChanged(e: any) {
    this.type = e.target.value;
    this.getVisits();
  }

  async delete(id: string, documentVisitId: string) {
    const loading = await this.alertService.showLoading();
    this.visitsService.delete(id, documentVisitId).subscribe({
      next: async (value) => {
        loading.dismiss();
        this.alertService.alert({ header: 'Sucesso', message: 'Deletado com sucesso' });
        await this.getVisits();
      },
      error: (err) => {
        loading.dismiss();
        const { error } = err;

        this.alertService.alert({ header: 'Erro', message: error.message })
      }
    })
  }

}
