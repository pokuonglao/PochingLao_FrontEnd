import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactWelcomeContentComponent } from './contact-welcome-content.component';

describe('ContactWelcomeContentComponent', () => {
  let component: ContactWelcomeContentComponent;
  let fixture: ComponentFixture<ContactWelcomeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactWelcomeContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactWelcomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
