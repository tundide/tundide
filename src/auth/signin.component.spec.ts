// import { TestBed, ComponentFixture, async } from '@angular/core/testing';
// import { SigninComponent } from './signin.component';
// import { AuthService } from './auth.service';
// import { MochAuthService } from './auth.service.stub';
// // Straight Jasmine testing without Angular's testing support
// describe('ValueService', () => {
//   let fixture: ComponentFixture<SigninComponent>;
//   let testAuthService: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         SigninComponent
//       ],
//       providers: [{ provide: AuthService, useClass: MochAuthService }] // --> new code
//     });
//     TestBed.compileComponents();

//     testAuthService = TestBed.get(AuthService);

//     componentService = fixture.debugElement.injector.get(AuthService);
//   });

//   beforeEach(() => { service = new AuthService(); });

//   it('#getValue should return real value', () => {
//     expect(service.getValue()).toBe('real value');
//   });

//   it('#getObservableValue should return value from observable',
//     (done: DoneFn) => {
//       service.getObservableValue().subscribe(value => {
//         expect(value).toBe('observable value');
//         done();
//       });
//     });

//   it('#getPromiseValue should return value from a promise',
//     (done: DoneFn) => {
//       service.getPromiseValue().then(value => {
//         expect(value).toBe('promise value');
//         done();
//       });
//     });
// });