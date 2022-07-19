import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedPositionListComponent } from './closed-position-list.component';

describe('ClosedPositionListComponent', () => {
  let component: ClosedPositionListComponent;
  let fixture: ComponentFixture<ClosedPositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedPositionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
