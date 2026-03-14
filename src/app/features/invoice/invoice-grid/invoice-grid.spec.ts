import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGrid } from './invoice-grid';

describe('InvoiceGrid', () => {
  let component: InvoiceGrid;
  let fixture: ComponentFixture<InvoiceGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
