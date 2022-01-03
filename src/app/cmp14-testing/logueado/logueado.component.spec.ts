import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogueadoComponent } from './logueado.component';

describe('LogueadoComponent', () => {
  let component: LogueadoComponent;
  let fixture: ComponentFixture<LogueadoComponent>;

  // beforeEach son funciones que se van a ejecutar antes de cada it

  // Este beforeEach crea su propio módulo para generar el testing
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogueadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogueadoComponent); // en el fixture guardaríamos el componente
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Podemos poner xit para que no ejecute ese caso de prueba
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Los it son los casos que queremos probar
  it('si no estás logueado debería de aparecer la página de "Logueate"', () => {
    const dom = fixture.debugElement.nativeElement
    expect(dom.querySelector('p').textContent).toEqual('Logueate por favor')
  })
  
  it('si estás logueado debería de aparecer el nombre del usuario', () => {
    component.estasLogueado = true
    fixture.detectChanges()
    const dom = fixture.debugElement.nativeElement
    expect(dom.querySelector('p').textContent).toEqual('Bienvenido ' + component.nombre)
  })

});
