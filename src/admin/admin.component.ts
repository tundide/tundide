import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../auth/user.model';
import { SocketService } from '../shared/socket.service';
import { AnalyticsService } from '../@core/utils/analytics.service';
import { StorageService } from '../@core/utils/storage.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

/* development:start */
import * as $S from 'scriptjs';
/* development:end */

const _some = require('lodash/some');

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'admin',
    styleUrls: ['admin.component.scss',
        '../../node_modules/ng2-toasty/style.css',
        '../../node_modules/ng2-toasty/style-bootstrap.css',
        '../../node_modules/angular2-busy/build/style/busy.css',
        '../../node_modules/@ng-select/ng-select/themes/default.theme.css'],
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {
    @ViewChild('contactus') contactusModal: NgbModal;

    // TODO: Agregar manejo de errores a traves del EventEmitter
    // @Output() errorOccurred = new EventEmitter();
    private roles: Array<String>;
    private subscription: Subscription;
    private user: User;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private analytics: AnalyticsService,
        private modalService: NgbModal,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private authService: AuthService,
        private storageService: StorageService,
        private socketService: SocketService) {
        this.toastyConfig.theme = 'bootstrap';
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });
    }

    onContactUsClick() {
        this.modalService.open(this.contactusModal, { size: 'lg' }).result.then((result) => {
            if (result) {
                this.toastyService.success({
                    msg: 'El mensaje se envio correctamente',
                    showClose: true,
                    theme: 'bootstrap',
                    timeout: 5000,
                    title: 'Mensaje enviado con exito.'
                });
            }
        });
    }

    hasRole(role) {
        return _some(this.roles, function (_role) {
            return _role === role;
        });
    }

    ngOnInit() {
        this.analytics.trackPageViews();

        this.subscription = this.route.queryParams.subscribe(
            (queryParam: any) => {
                let token: string;

                if (queryParam['t']) {
                    token = queryParam['t'];
                    this.storageService.set('token', queryParam['t'], true);
                } else {
                    token = this.storageService.get('token', true);
                }

                if (token) {
                    this.authService.loadUserData(token).subscribe(
                        (user) => {
                            let u = new User(user.name, user.username, user.shortId, user.id,
                                user.roles, user.firstIncome);
                            this.storageService.set('user', user);
                            this.user = user;
                            this.authService.onUserDataLoad.emit(user);
                            this.socketService.connectSocket(user.shortId);

                            if (user.firstIncome) {
                                this.router.navigate(['/start']);
                            }

                        });
                }
            });

        // TODO: Agregar manejo de errores a traves del EventEmitter
        // this.http.errorOccurred.subscribe((error) => {
        //     let toastOptions: ToastOptions = {
        //         msg: error.message,
        //         showClose: true,
        //         theme: 'bootstrap',
        //         timeout: 5000,
        //         title: 'Ocurrio un error'
        //     };

        //     this.toastyService.error(toastOptions);
        // });

        /* development:start */
        $S('http://localhost:35729/livereload.js', function () {
            console.log('LiveReload Habilitado');
        });
        /* development:end */

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}