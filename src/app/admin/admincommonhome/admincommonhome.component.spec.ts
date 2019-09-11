import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincommonhomeComponent } from './admincommonhome.component';

describe('AdmincommonhomeComponent', () => {
  let component: AdmincommonhomeComponent;
  let fixture: ComponentFixture<AdmincommonhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincommonhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincommonhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
