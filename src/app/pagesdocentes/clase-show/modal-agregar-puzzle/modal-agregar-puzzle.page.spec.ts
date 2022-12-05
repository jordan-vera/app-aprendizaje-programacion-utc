import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalAgregarPuzzlePage } from './modal-agregar-puzzle.page';

describe('ModalAgregarPuzzlePage', () => {
  let component: ModalAgregarPuzzlePage;
  let fixture: ComponentFixture<ModalAgregarPuzzlePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAgregarPuzzlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAgregarPuzzlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
