import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilAuthComponent } from './util-auth.component';

describe('UtilAuthComponent', () => {
  let component: UtilAuthComponent;
  let fixture: ComponentFixture<UtilAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UtilAuthComponent]
    });
    fixture = TestBed.createComponent(UtilAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
