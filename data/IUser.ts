import Address from "./address";
import HousingStatus from "./housingStatus";
import IEmployment from "./employment/IEmployment";

export default interface IUser {
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
}