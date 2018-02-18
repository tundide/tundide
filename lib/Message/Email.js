// https://github.com/sendgrid/sendgrid-nodejs/blob/master/packages/mail/USE_CASES.md#attachments

// TODO: Eliminar el envio de mail por sendgrid 2 para migrar a sendgrid 3
const config = require('../../config/app.json');

const ical = require('ical-generator');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function createAppointment(appointment) {
    let cal = ical({ domain: 'tundide.com', name: 'Cita' });

    cal.domain('tundide.com');

    cal.createEvent({
        start: appointment.start,
        end: appointment.end,
        summary: appointment.title,
        description: appointment.description,
        location: appointment.location,
        url: appointment.url
    });

    return new Buffer(cal.toString()).toString('base64');
}

module.exports = {
    signoutConfirmSend: function(mailbody, done) {
        const msg = {
            to: mailbody.to,
            from: mailbody.from,
            subject: mailbody.subject,
            templateId: config.mail.templates.authentication.confirmMailId,
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
                userid: mailbody.userid,
                user: mailbody.name,
                site: process.env.SITE_URL
            }
        };
        sgMail.send(msg);
    },

    appointmentNew: function(mailbody) {
        let appointment = createAppointment({
            start: mailbody.start,
            end: mailbody.end,
            title: 'Usted tiene un turno asignado',
            description: 'Turno asignado',
            location: 'San Martin',
            url: 'url'
        });

        const msg = {
            to: 'marcos.panichella@gmail.com',
            from: 'mail@tundide.com',
            subject: 'Turno agendado',
            templateId: config.mail.templates.appointment.appointmentNewId,
            attachments: [{
                content: appointment,
                filename: 'appointment.ics',
                type: 'text/calendar',
                disposition: 'attachment',
                contentId: 'mytext'
            }],
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
                user: "Marcos Panichella",
                participant: 'Doctor Abel Albino',
                datetime: '18/02/2018 14:30'
            }
        };
        sgMail.send(msg).then(([response, body]) => {
            console.log(response.statusCode);
            console.log(body);
        });
    }
};