import Employment from "./Employment";
import * as faker from "faker/locale/en_US";
import { getRandomMonthYearString } from "../../utility/helpers";

export default class Retired extends Employment {

    incomeSource: string;
    unemployedSince: string;

    constructor() {
        super("Unemployed");
        this.incomeSource = faker.random.arrayElement(["Employed by Others", "Overtime Employment", "Child Support", "Social Security", "Business Owner / Self Employed", "Retired with Pension", "Military", "Rental Income", "Separate Maintenance", "Disability Insurance (Long Term)", "Disability Insurance (Short Term)", "Public Assistance", "Investment Income", "Alimony", "Unemployment Insurance"]);
        this.unemployedSince = getRandomMonthYearString();
    }
}