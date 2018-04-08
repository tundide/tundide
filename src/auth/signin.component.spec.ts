import { TestBed, async } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { AuthService } from './auth.service';
import { StorageService } from '../@core/utils/storage.service';
import { CryptService } from '../@core/utils/crypt.service';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../auth/auth-guard.service';
import { SocketService } from '../shared/socket.service';
import { HttpClientModule } from '@angular/common/http';

class MockAuthService extends AuthService {
    authenticated = false;

    isAuthenticated() {
        return this.authenticated;
    }
}

class MockStorageService extends StorageService {
    authenticated = false;

    isAuthenticated() {
        return this.authenticated;
    }
}

describe('SigninComponent', () => {
    let component: SigninComponent;
    let authService: MockAuthService;
    let storageService: MockStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SigninComponent
            ],
            imports: [HttpModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                NgbModule.forRoot()],
            providers: [
                AuthGuard,
                AuthService,
                SocketService,
                StorageService,
                CryptService
            ],
        }).compileComponents();
    });

    it('should create the signin', async(() => {

        const fixture = TestBed.createComponent(SigninComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    // it('should render title in a h1 tag', async(() => {
    //     const fixture = TestBed.createComponent(SigninComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('#cardLogin').textContent).toContain('');
    // }));
});
