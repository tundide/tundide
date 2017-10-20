export class Client {
    _id: string;
    firstName: string;
    lastName: string;
    location: {
        place: number,
        province: number,
        street: string,
        number: number
    };

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.location = {
            number: 0,
            place: 0,
            province: 0,
            street: ''
        };
    }
}