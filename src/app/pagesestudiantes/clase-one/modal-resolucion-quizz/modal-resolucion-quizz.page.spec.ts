import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalResolucionQuizzPage } from './modal-resolucion-quizz.page';

describe('ModalResolucionQuizzPage', () => {
  let component: ModalResolucionQuizzPage;
  let fixture: ComponentFixture<ModalResolucionQuizzPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResolucionQuizzPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalResolucionQuizzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
