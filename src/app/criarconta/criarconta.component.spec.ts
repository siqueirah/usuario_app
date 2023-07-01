import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarcontaComponent } from './criarconta.component';

describe('CriarcontaComponent', () => {
  let component: CriarcontaComponent;
  let fixture: ComponentFixture<CriarcontaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarcontaComponent]
    });
    fixture = TestBed.createComponent(CriarcontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
