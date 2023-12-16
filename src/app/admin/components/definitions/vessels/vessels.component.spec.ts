import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselsComponent } from './vessels.component';

describe('VesselsComponent', () => {
  let component: VesselsComponent;
  let fixture: ComponentFixture<VesselsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VesselsComponent]
    });
    fixture = TestBed.createComponent(VesselsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
