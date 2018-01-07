import { Component, OnInit, OnDestroy, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';
import { Subscription } from 'rxjs/Rx';
import { User } from '../auth/user.model';
import { SocketService } from '../shared/socket.service';
import { AnalyticsService } from '../@core/utils/analytics.service';
declare var $: JQueryStatic;
import * as $S from 'scriptjs';
import * as _ from 'lodash';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'admin',
    styleUrls: ['admin.component.scss'],
    templateUrl: 'admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {
    @ViewChild('contactus') contactusModal: NgbModal;

    // TODO: Agregar manejo de errores a traves del EventEmitter
    // @Output() errorOccurred = new EventEmitter();
    private roles: Array<String>;
    private subscription: Subscription;
    private user: User;

    constructor(elm: ElementRef,
        public router: Router,
        public route: ActivatedRoute,
        private analytics: AnalyticsService,
        private modalService: NgbModal,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
        private authService: AuthService,
        private socketService: SocketService) {
        this.toastyConfig.theme = 'bootstrap';
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                ga('set', 'page', event.urlAfterRedirects);
                ga('send', 'pageview');
            }
        });

        this.subscription = this.route.queryParams.subscribe(
            (queryParam: any) => {
                let token: string;

                if (queryParam['t']) {
                    token = queryParam['t'];
                    window.location.href = '/#/';
                    localStorage.setItem('token', queryParam['t']);
                } else {
                    token = localStorage.getItem('token');
                }

                if (token) {
                    this.authService.loadUserData(token).subscribe(
                        (user) => {
                            let u = new User(user.name, user.username, user.shortId, user.id,
                                user.roles, user.firstIncome);
                            sessionStorage.setItem('user', JSON.stringify(user));
                            this.user = user;
                            this.socketService.connectSocket(user.shortId);
                            this.authService.onUserDataLoad.emit(user);
                        });
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
        return _.some(this.roles, function (_role) {
            return _role === role;
        });
    }

    ngOnInit() {
        this.analytics.trackPageViews();
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

        if (process.env.environment === 'development') {
            $S('http://localhost:35729/livereload.js', function () {
                console.log('Debug Habilitado');
            });
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}