import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { AuthService } from './auth.service';
import { MochAuthService } from './auth.service.stub';

describe('ValueService', () => {
    let fixture: ComponentFixture<SigninComponent>;
    let testAuthService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SigninComponent
            ],
            providers: [{ provide: AuthService, useClass: MochAuthService }] // --> new code
        });
        TestBed.compileComponents();

        testAuthService = TestBed.get(AuthService);

        // componentService = fixture.debugElement.injector.get(AuthService);
    });

    it('#getValue should return real value', () => {
        testAuthService.signout('', '', '', '').subscribe(result =>
            expect(result).toBeGreaterThan(13));
    });
});