import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfpsComponent } from './pfps.component';

describe('PfpsComponent', () => {
  let component: PfpsComponent;
  let fixture: ComponentFixture<PfpsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PfpsComponent]
    });
    fixture = TestBed.createComponent(PfpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
