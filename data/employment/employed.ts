import Employment from "./Employment";
import * as faker from "faker/locale/en_US";
import { getRandomMonthYearString } from "../../utility/helpers";

export default class Employed extends Employment {

    employerName: string;
    jobTitle: string;
    employerPhoneNumber: string;
    startDate: string;

    constructor() {
        super("Employed");
        this.employerName = faker.company.companyName();
        this.jobTitle = faker.finance.accountName();
        this.employerPhoneNumber = "8005551212"; //faker.phone.phoneNumber('##########');
        this.startDate = getRandomMonthYearString();
    }
}