import * as faker from "faker/locale/en_US";

export default class Address {

    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;

    constructor() {
        this.streetAddress = faker.address.streetAddress();
        this.city = faker.address.city();
        this.state = faker.address.state();
        this.zipCode = "22033";
        //this.zipCode = faker.address.zipCode("####");      
    }
}