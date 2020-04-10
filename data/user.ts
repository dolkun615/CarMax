import IUser from "./IUser";
import Address from "./address";
import HousingStatus from "./housingStatus";
import IEmployment from "./employment/IEmployment";
import Employed from "./employment/Employed";
import * as faker from "faker/locale/en_US";
import { getDateOfBirthOlderThan18 } from '../utility/helpers';

export default class User implements IUser {

    userName: string;
    password: string;
    firstName: string;
    lastName: string; 
    dateOfBirth: string;
    phoneNumber: string;
    socialSecurityNumber: string;
    ssnLastFour: string;
    address: Address;
    housingStatus: HousingStatus;
    employment: IEmployment;

    constructor() {

        const date = new Date();
        this.userName = `automatedtest-${date.getTime()}@test.com`;
        this.password = "qwerty12345!";
        this.firstName = faker.name.firstName();
        this.lastName = faker.name.lastName();
        this.dateOfBirth = getDateOfBirthOlderThan18();
        this.phoneNumber = "8045551212";
        this.socialSecurityNumber = "678605577";
        //this.socialSecurityNumber =  new SSNTools.RandomSSN().value().toString();
        this.ssnLastFour = this.socialSecurityNumber.substr(this.socialSecurityNumber.length - 4);

        this.address = new Address();
        this.housingStatus = new HousingStatus();
        this.employment = new Employed();
    }
}