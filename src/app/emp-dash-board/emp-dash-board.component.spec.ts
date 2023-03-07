import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDashBoardComponent } from './emp-dash-board.component';

describe('EmpDashBoardComponent', () => {
  let component: EmpDashBoardComponent;
  let fixture: ComponentFixture<EmpDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpDashBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
