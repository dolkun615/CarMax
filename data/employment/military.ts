import Employment from "./Employment";
import * as faker from "faker/locale/en_US";
import { getRandomMonthYearString } from "../../utility/helpers";

export default class Military extends Employment {

    militaryBranch: string;
    payGrade: string;
    employerPhoneNumber: string;
    startDate: string;

    constructor() {
        super("Military");
        this.militaryBranch = faker.random.arrayElement(["Army", "Navy", "Air Force", "Marines", "Coast Guard"]);
        this.payGrade = faker.random.arrayElement(["E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-6", "E-7", "E-8", "E-9", "W-1", "W-2", "W-3", "W-4", "W-5", "O-1", "O-2", "O-3", "O-4", "O-5", "O-6", "O-7", "O-8", "O-9", "O-10"]);
        this.employerPhoneNumber = "8005551212"; //faker.phone.phoneNumber('##########');
        this.startDate = getRandomMonthYearString();
    }
}