import * as faker from "faker/locale/en_US";
import { getRandomMonthYearString } from "../utility/helpers";

export default class HousingStatus {

    status: string;
    monthlyPayment: number;
    moveInDate: string;

    constructor() {
        this.status = faker.random.arrayElement(["Own", "Rent", "Other"]);
        this.monthlyPayment = 1900;
        //this.monthlyPayment = faker.random.number({min: 350, max: 9999});
        this.moveInDate = getRandomMonthYearString();
    }
}