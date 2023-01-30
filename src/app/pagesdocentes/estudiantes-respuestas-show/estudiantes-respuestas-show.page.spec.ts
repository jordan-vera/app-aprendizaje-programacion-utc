import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstudiantesRespuestasShowPage } from './estudiantes-respuestas-show.page';

describe('EstudiantesRespuestasShowPage', () => {
  let component: EstudiantesRespuestasShowPage;
  let fixture: ComponentFixture<EstudiantesRespuestasShowPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesRespuestasShowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstudiantesRespuestasShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
