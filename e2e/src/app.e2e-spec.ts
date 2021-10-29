import { browser, by, element, protractor } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let app: AppPage;
  let EC = protractor.ExpectedConditions;

  beforeEach(() => {
    app = new AppPage();
  });

  it('Should have one module available', () => {
    app.navigateToHomePage();
    
    
    app.waitForComponent('o5-home').then(() => {
      var modules = app.getAllByClass('module-wrapper');
  
      expect(modules.count()).toEqual(1);
    });
  });

  it('Should navigate to the dnd dashboard', () => {
    app.waitForComponent('o5-home').then(() => {
      var modules = app.getAllByClass('module-wrapper');
      modules.first().click();
      
      app.waitForComponent('o5-dnd-dashboard').then(() => {
        expect(element(by.tagName('o5-dnd-dashboard')).isPresent());
      });
    });
  });
});
