import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  navigateToPath(path:string){
    return browser.get('/'+path);
  }

  getElementByClassName(className:string){
    return element(by.className(className));
  }

  getElement(id:string){
    return element(by.id(id));
  }

  getElementByTagName(tagName:string){
    return element(by.tagName(tagName));
  }
}
