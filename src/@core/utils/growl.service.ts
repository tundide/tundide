import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions } from 'ng2-toasty';

@Injectable()
export class GrowlService {
    constructor(
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig,
    ) {
        this.toastyConfig.theme = 'bootstrap';
    }

    success(options) {
        this.toastyService.success({
            msg: options.msg,
            showClose: true,
            theme: 'bootstrap',
            timeout: 5000,
            title: options.title
        });
    }

    error(options) {
        this.toastyService.error({
            msg: options.msg,
            showClose: true,
            theme: 'bootstrap',
            timeout: 5000,
            title: options.title
        });
    }

    warning(options) {
        this.toastyService.warning({
            msg: options.msg,
            showClose: true,
            theme: 'bootstrap',
            timeout: 5000,
            title: options.title
        });
    }

    noContent() {
        this.toastyService.info({
            msg: 'No se encontraron resultados.',
            showClose: true,
            theme: 'bootstrap',
            timeout: 5000,
            title: 'Sin resultados!'
        });
    }

    badRequest() {
        this.toastyService.warning({
            msg: 'Los datos que esta ingresando no son validos, ' +
                'Por favor corriga los datos, y vuelva a intentarlo.',
            showClose: true,
            theme: 'bootstrap',
            timeout: 5000,
            title: 'Atenci&oacute;n!'
        });
    }

    notFound() {
        this.toastyService.error({
            msg: 'El elemento al que hace referencia ' +
                'no se encuentra en nuestra base de datos.',
            showClose: true,
            theme: 'bootstrap',
            timeout: 5000,
            title: 'Elemento no encontrado.'
        });
    }

    internalServerError() {
        this.toastyService.error({
            msg: 'Ocurrio un error inesperado. Por favor reintente mas tarde, ' +
                'si el problema persiste comuniquese con nosotros.',
            showClose: true,
            theme: 'bootstrap',
            timeout: 5000,
            title: 'Ocurrio un error.'
        });
    }
}