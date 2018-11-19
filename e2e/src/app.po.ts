import { browser, by, element } from 'protractor';

export class CursoPage {
  navigateTo() {
    return browser.get('/');
  }

  getH1Text() {
    return element(by.css('h1')).getText();
  }

  getLoginLink() {
    return element(by.linkText('Login'));
  }

  getH2Text() {
    return element(by.css('h2')).getText();
  }
}
