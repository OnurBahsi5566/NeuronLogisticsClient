import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoContainersComponent } from './cargo-containers.component';

describe('CargoContainersComponent', () => {
  let component: CargoContainersComponent;
  let fixture: ComponentFixture<CargoContainersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargoContainersComponent]
    });
    fixture = TestBed.createComponent(CargoContainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
