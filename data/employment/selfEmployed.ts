import Employment from "./Employment";
import * as faker from "faker/locale/en_US";
import { getRandomMonthYearString } from "../../utility/helpers";

export default class SelfEmployed extends Employment {

    businessName: string;
    jobTitle: string;
    businessPhoneNumber: string;
    startDate: string;

    constructor() {
        super("Business Owner / Self-Employed");
        this.businessName = faker.company.companyName();
        this.jobTitle = faker.finance.accountName();
        this.businessPhoneNumber = "8005551212"; //faker.phone.phoneNumber('##########');
        this.startDate = getRandomMonthYearString();
    }
}