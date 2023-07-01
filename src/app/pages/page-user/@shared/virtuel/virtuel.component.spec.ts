import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtuelComponent } from './virtuel.component';

describe('VirtuelComponent', () => {
  let component: VirtuelComponent;
  let fixture: ComponentFixture<VirtuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtuelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
