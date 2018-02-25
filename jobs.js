/**
 * Jobs for batch process
 * @namespace Jobs
 */

let CronJob = require('cron').CronJob;
let laboratories = require('./jobs/laboratories.js');

new CronJob('5 * * * * *', function() {
    console.log('Se avisaron a 10 clientes que su cita se acerca.');
}, null, true);

new CronJob('5 * * * * *', function() {
    console.log('Se bloquearon 10 usuarios vencidos');
}, null, true);

new CronJob('5 * * * * *', function() {
    console.log('Se eliminaron 10 usuarios sin uso');
}, null, true);

new CronJob('0 0 0 1/1 * *', function() {
    laboratories.process();
}, null, true);
// laboratories.process();

// let jobRefreshHerokuSleepingTime = new CronJob('5 * * * * *', function() {
//     http.request({
//         host: 'http://www.tundide.com',
//         path: '/',
//         port: 80
//     }, function(response) {
//         console.log(response);
//     }).end();
// }, null, true);

// jobRefreshHerokuSleepingTime.start();
// TODO: Enviar email sobre encuesta de como te atendieron.