import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllConversationComponent } from './all-conversation.component';

describe('AllConversationComponent', () => {
  let component: AllConversationComponent;
  let fixture: ComponentFixture<AllConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllConversationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
