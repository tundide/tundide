import { Component, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
    selector: 'customersserved',
    styleUrls: ['customersserved.component.scss'],
    templateUrl: 'customersserved.component.html'
})
export class CustomersServedComponent {
    canvas: any;
    ctx: any;

    ngAfterViewInit() {
        this.canvas = document.getElementById('customersservedChart');
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
            data: {
                datasets: [{
                    backgroundColor: [
                        'rgba(86, 252, 216, 0.9)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1,
                    data: [100, 23, 80],
                    label: '# de clientes atentidos'
                }],
                labels: ['En espera', 'Atendiendose', 'Atendidos'],
            },
            options: {
                display: true,
                responsive: false
            },
            type: 'line'
        });
    }
}