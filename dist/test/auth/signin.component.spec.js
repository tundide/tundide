"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var signin_component_1 = require("./signin.component");
describe('AppComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                signin_component_1.SigninComponent
            ],
        }).compileComponents();
    }));
    it('should create the app', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(signin_component_1.SigninComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it("should have as title 'app'", testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(signin_component_1.SigninComponent);
        var app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('app');
    }));
    it('should render title in a h1 tag', testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(signin_component_1.SigninComponent);
        fixture.detectChanges();
        var compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
    }));
});
//# sourceMappingURL=signin.component.spec.js.map