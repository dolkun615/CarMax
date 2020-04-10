import IEmployment from "./IEmployment";
import * as faker from "faker/locale/en_US";

export default abstract class Employment implements IEmployment {

    readonly status: string;
    annualIncome: number;

    constructor(employmentStatus : string) {
        this.status = employmentStatus;
        this.annualIncome = faker.random.number({ min: 5000, max: 999999 });
    }
}