import IUser from "./IUser";
import Address from "./address";
import HousingStatus from "./housingStatus";
import Employed from "./employment/Employed";

export default class SnapshotUser implements IUser {

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
    employment: Employed;

    constructor() {

        const date = new Date();
        this.userName = `automatedtest-${date.getTime()}@test.com`;
        this.password = "qwerty12345!";
        this.firstName = "Adam";
        this.lastName = "Smith";
        this.dateOfBirth = '01011970';
        this.phoneNumber = "8045551212";
        this.socialSecurityNumber = '222334444';
        this.ssnLastFour = '4444';

        this.address = new Address();
        this.address.city = 'Richmond';
        this.address.state = 'VA';
        this.address.streetAddress = '12345 Sesame Street';
        this.address.zipCode = '23235';

        this.housingStatus = new HousingStatus();
        this.housingStatus.monthlyPayment = 1000;
        this.housingStatus.moveInDate = '012010';
        this.housingStatus.status = 'Own';

        this.employment = new Employed();
        this.employment.annualIncome = 100000;
        this.employment.employerName = 'Fabrikam Inc.';
        this.employment.employerPhoneNumber = '8005551212';
        this.employment.jobTitle = 'QA Tester';
        this.employment.startDate = '012015';        
    }
}