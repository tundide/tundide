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
    signoutConfirmSend: function(mailbody) {
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

    appointmentNew: function(app) {
        let appointment = createAppointment({
            start: app.start,
            end: app.end,
            title: app.title,
            description: app.description,
            location: app.location,
            url: app.url
        });

        const msg = {
            to: app.to,
            from: 'mail@tundide.com',
            subject: app.title,
            templateId: config.mail.templates.appointment.appointmentNewId,
            attachments: [{
                content: appointment,
                content_id: app.id,
                disposition: 'inline',
                filename: 'appointment.ics',
                name: 'appointment',
                type: 'text/calendar'
            }],
            substitutionWrappers: ['{{', '}}'],
            substitutions: {
                contact: app.contact,
                participant: app.participant,
                datetime: app.start
            }
        };
        sgMail.send(msg).then(([response, body]) => {
            console.log(response.statusCode);
            console.log(body);
        });
    }
};