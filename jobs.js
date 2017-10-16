/**
 * Jobs for batch process
 * @namespace Jobs
 */
// TODO: Armar los jobs

let CronJob = require('cron').CronJob;

let jobSendMailAppointmentToExpire = new CronJob('5 * * * * *', function() {

    console.log('Se avisaron a 10 clientes que su cita se acerca.');
}, null, true);

jobSendMailAppointmentToExpire.start();

let jobLockExpiredUser = new CronJob('5 * * * * *', function() {
    console.log('Se bloquearon 10 usuarios vencidos');
}, null, true);

jobLockExpiredUser.start();

let jobRemoveUnusedUsers = new CronJob('5 * * * * *', function() {
    console.log('Se eliminaron 10 usuarios sin uso');
}, null, true);

jobRemoveUnusedUsers.start();

let jobDeleteExpiredPublications = new CronJob('5 * * * * *', function() {
    console.log('Se eliminar 5 publicaciones vencidas');
}, null, true);

jobDeleteExpiredPublications.start();

let jobCalculatePublicationScore = new CronJob('5 * * * * *', function() {
    console.log('Se calcularon los scores de las publicaciones');
}, null, true);

jobCalculatePublicationScore.start();
// TODO: Enviar email sobre encuesta de como te atendieron.