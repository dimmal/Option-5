import { browser, by, element, ElementArrayFinder, protractor } from 'protractor';

export class AppPage {
  expectedConditions = protractor.ExpectedConditions;
  
  navigateToHomePage() {
    return browser.get('http://localhost:4200/');
  }

  waitForComponent(componentSelector: string) {
    return browser.wait(this.expectedConditions.presenceOf(element(by.tagName(componentSelector))), 10000);
  }

  getAllByClass(className: string): ElementArrayFinder {
    return element.all(by.className(className));
  }

}
