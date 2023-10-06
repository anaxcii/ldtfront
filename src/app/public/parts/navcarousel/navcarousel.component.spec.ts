import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavcarouselComponent } from './navcarousel.component';

describe('NavcarouselComponent', () => {
  let component: NavcarouselComponent;
  let fixture: ComponentFixture<NavcarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavcarouselComponent]
    });
    fixture = TestBed.createComponent(NavcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
