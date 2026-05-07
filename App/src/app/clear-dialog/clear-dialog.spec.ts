import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearDialog } from './clear-dialog';

describe('ClearDialog', () => {
  let component: ClearDialog;
  let fixture: ComponentFixture<ClearDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
