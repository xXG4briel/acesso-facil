import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VisitorsApprovalPage } from './visitors-approval.page';

describe('VisitorsApprovalPage', () => {
  let component: VisitorsApprovalPage;
  let fixture: ComponentFixture<VisitorsApprovalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
