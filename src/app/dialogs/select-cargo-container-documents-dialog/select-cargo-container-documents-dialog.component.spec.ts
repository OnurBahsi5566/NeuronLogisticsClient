import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCargoContainerDocumentsDialogComponent } from './select-cargo-container-documents-dialog.component';

describe('SelectCargoContainerDocumentsDialogComponent', () => {
  let component: SelectCargoContainerDocumentsDialogComponent;
  let fixture: ComponentFixture<SelectCargoContainerDocumentsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCargoContainerDocumentsDialogComponent]
    });
    fixture = TestBed.createComponent(SelectCargoContainerDocumentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
