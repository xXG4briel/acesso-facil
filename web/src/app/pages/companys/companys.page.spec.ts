import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanysPage } from './companys.page';

describe('CompanysPage', () => {
  let component: CompanysPage;
  let fixture: ComponentFixture<CompanysPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
