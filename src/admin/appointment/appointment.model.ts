export class Appointment {
    _id: string;
    shortId: string;
    client: string;
    endDate: Date;
    startDate: Date;
    description: string;
    approved: boolean;
}