import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramComponent } from './tram.component';

describe('TramComponent', () => {
  let component: TramComponent;
  let fixture: ComponentFixture<TramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
