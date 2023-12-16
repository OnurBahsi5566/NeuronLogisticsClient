import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoContainerCardComponent } from './cargo-container-card.component';

describe('CargoContainerCardComponent', () => {
  let component: CargoContainerCardComponent;
  let fixture: ComponentFixture<CargoContainerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargoContainerCardComponent]
    });
    fixture = TestBed.createComponent(CargoContainerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
