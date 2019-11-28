import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorteningDetailComponent } from './shortening-detail.component';

describe('ShorteningDetailComponent', () => {
  let component: ShorteningDetailComponent;
  let fixture: ComponentFixture<ShorteningDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShorteningDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShorteningDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
