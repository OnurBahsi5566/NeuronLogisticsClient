import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoContainerListComponent } from './cargo-container-list.component';

describe('CargoContainerListComponent', () => {
  let component: CargoContainerListComponent;
  let fixture: ComponentFixture<CargoContainerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargoContainerListComponent]
    });
    fixture = TestBed.createComponent(CargoContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
