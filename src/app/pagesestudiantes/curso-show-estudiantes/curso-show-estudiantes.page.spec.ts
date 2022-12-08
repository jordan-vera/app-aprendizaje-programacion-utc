import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CursoShowEstudiantesPage } from './curso-show-estudiantes.page';

describe('CursoShowEstudiantesPage', () => {
  let component: CursoShowEstudiantesPage;
  let fixture: ComponentFixture<CursoShowEstudiantesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoShowEstudiantesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CursoShowEstudiantesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
