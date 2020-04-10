import { arrangeTestSession, register, validatePageTitle, waitUntilUrlIncludes } from '../../../../utility/helpers';
import RegisterPage from '../../../pages/register';
import User from '../../../../data/user';
import CheckoutPage from '../../../pages/checkout/checkout';
import VehicleHistoryPage from '../../../pages/checkout/historyReport/vehicleHistoryPage';

describe('V1 Vehicle History Report', () => {
  let stockNumber: number = 1002;
  let checkoutPage: CheckoutPage = new CheckoutPage(stockNumber);
  let vehicleHistoryPage: VehicleHistoryPage = new VehicleHistoryPage(stockNumber);
  let user: User = new User();

  before(() => {
    console.log(`The current user under test is: ${user.userName}`);
    arrangeTestSession(RegisterPage.url);
    register(user, true);
    browser.url(checkoutPage.startProgressionUrl());
    checkoutPage.open();
    validatePageTitle(checkoutPage.title);
  });
  it('clicking history report task card and verify storck No and url', () => {
    checkoutPage.historyReportTaskCard.click();
    browser.pause(3000);
    waitUntilUrlIncludes("history");
  });

  it('History report task card is updated with completed', () => {
    vehicleHistoryPage.closeButton.click();
    browser.pause(3000);
    checkoutPage.historyReportCompletedText.getText().should.equal('COMPLETED');
  });
});
