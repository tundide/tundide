export class Contact {
    _id: string;
    firstName: string;
    lastName: string;
    document: string;
    contact: {
        cellPhone: number,
        phone: number,
        email: string
    };
    location: {
        place: {
            code: number,
            description: string,
            zip: number
        },
        province: number,
        street: string,
        number: number
    };
    company: string;
    user: string;
    comments:string;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.document = '';
        this.contact = {
            cellPhone: 0,
            email: '',
            phone: 0
        };
        this.location = {
            number: 0,
            place: {
                code: 0,
                description: '',
                zip: 0
            },
            province: 0,
            street: ''
        };
        this.company = '';
        this.user = '';
        this.comments = '';
    }
}