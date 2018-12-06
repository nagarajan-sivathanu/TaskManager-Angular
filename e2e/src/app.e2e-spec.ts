import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

 
  it('should display app title', () => {
    page.navigateTo();
    expect(page.getElement('appTitle').getText()).toEqual('TaskManager..!');
  });

  it('should display app description', () => {
    page.navigateTo();
    expect(page.getElementByClassName('lead').getText()).toEqual('Regardless of your profession or industry, having to deal with multiple deadlines is commonplace in working life. It’s easy to feel under pressure and fall behind with your work when you have so much to do, but task management software can help keep things under control.');
  });

  it('should display nav bar text - Add Task',() => {
    page.navigateTo();
    expect(page.getElement('addTask').getText()).toEqual('Add Task');
  });

  it('should display nav bar text - View Task',() => {
    page.navigateTo();
    expect(page.getElement('viewTask').getText()).toEqual('View Task');
  });

  it('should route to Add Task',() => {
    page.navigateTo();
    page.getElement('addTask').click();
    expect(page.getElementByTagName('h4').getText()).toEqual('Add Your New Task....');
  });

  it('should route to View Task',() => {
    page.navigateTo();
    page.getElement('viewTask').click();
    expect(page.getElementByTagName('h4').getText()).toEqual('Search & Filter Tasks');
  });

  it('should validate Add Task Form successfully',() => {
    page.navigateToPath('add');
    page.getElement('taskname').sendKeys('Task - Test 01');
    page.getElement('priority').sendKeys('05');
    page.getElement('Id').sendKeys('Parent Task - Test');
    page.getElement('startDate').sendKeys('01/12/2018');
    page.getElement('endDate').sendKeys('01/12/2018');
    let form = page.getElement('addTaskForm').getAttribute('class');
    expect(form).toContain('ng-valid');
  });
  it('should validate Add Task Form for mandatory TaskName Field ',() => {
    page.navigateToPath('add');
    page.getElement('taskname').sendKeys('');
    page.getElement('priority').sendKeys('05');
    page.getElement('Id').sendKeys('Parent Task - Test');
    page.getElement('startDate').sendKeys('01/12/2018');
    page.getElement('endDate').sendKeys('01/12/2018');
    let form = page.getElement('addTaskForm').getAttribute('class');
    expect(form).toContain('ng-invalid');
  });
  it('should validate Add Task Form for mandatory Start Date Field',() => {
    page.navigateToPath('add');
    page.getElement('taskname').sendKeys('Task - Test 01');
    page.getElement('priority').sendKeys('05');
    page.getElement('Id').sendKeys('Parent Task - Test');
    page.getElement('startDate').sendKeys('');
    page.getElement('endDate').sendKeys('01/12/2018');
    let form = page.getElement('addTaskForm').getAttribute('class');
    expect(form).toContain('ng-invalid');
  });
  it('should validate Add Task Form for mandatory End Date Field',() => {
    page.navigateToPath('add');
    page.getElement('taskname').sendKeys('Task - Test 01');
    page.getElement('priority').sendKeys('05');
    page.getElement('Id').sendKeys('Parent Task - Test');
    page.getElement('startDate').sendKeys('01/12/2018');
    page.getElement('endDate').sendKeys('');
    let form = page.getElement('addTaskForm').getAttribute('class');
    expect(form).toContain('ng-invalid');
  });
  it('should validate Add Task Form for Default Inputs',() => {
    page.navigateToPath('add');
    page.getElement('taskname').sendKeys('');
    page.getElement('priority').sendKeys('15');
    page.getElement('Id').sendKeys('');
    page.getElement('startDate').sendKeys('');
    page.getElement('endDate').sendKeys('');
    let form = page.getElement('addTaskForm').getAttribute('class');
    expect(form).toContain('ng-invalid');
  });
  
  it('should route to View Page on clicking Add Task Button for valid add task form',() => {
    page.navigateToPath('add');
    page.getElement('taskname').sendKeys('Task - Test 01');
    page.getElement('priority').sendKeys('05');
    page.getElement('Id').sendKeys('Parent Task - Test');
    page.getElement('startDate').sendKeys('01/12/2018');
    page.getElement('endDate').sendKeys('01/12/2018');
    let form = page.getElement('addTaskForm').getAttribute('class');
    if(expect(form).toContain('ng-valid')){
      page.getElement('AddTaskButton').click().then(function (alertText){
        browser.wait(function(){
          return browser.switchTo().alert().then(
            function () {return true;},
            function () {return false;}
          );
        },3000);
        var popupAlert = browser.switchTo().alert();
        expect(popupAlert.getText()).toMatch('Task Added Successfully...!!');
        // Close alert
        popupAlert.dismiss();
        });
      };
     expect(page.getElementByTagName('h4').getText()).toEqual('Search & Filter Tasks');
  });

 it('should validate Update Task Form successfully',() => {
  page.navigateToPath('update');
  page.getElement('taskname').sendKeys('Task - Test 01');
  page.getElement('priority').sendKeys('25');
  page.getElement('Id').sendKeys('Parent Task - Test');
  page.getElement('startDate').sendKeys('01/12/2018');
  page.getElement('endDate').sendKeys('01/12/2018');
  let form = page.getElement('updateTaskForm').getAttribute('class');
  expect(form).toContain('ng-valid');
});
it('should validate update Task Form for mandatory TaskName Field ',() => {
  page.navigateToPath('update');
  page.getElement('taskname').sendKeys('');
  page.getElement('priority').sendKeys('05');
  page.getElement('Id').sendKeys('Parent Task - Test');
  page.getElement('startDate').sendKeys('01/12/2018');
  page.getElement('endDate').sendKeys('01/12/2018');
  let form = page.getElement('updateTaskForm').getAttribute('class');
  expect(form).toContain('ng-invalid');
});
it('should validate update Task Form for mandatory Start Date Field',() => {
  page.navigateToPath('update');
  page.getElement('taskname').sendKeys('Task - Test 01');
  page.getElement('priority').sendKeys('05');
  page.getElement('Id').sendKeys('Parent Task - Test');
  page.getElement('startDate').sendKeys('');
  page.getElement('endDate').sendKeys('01/12/2018');
  let form = page.getElement('updateTaskForm').getAttribute('class');
  expect(form).toContain('ng-invalid');
});
it('should validate update Task Form for mandatory End Date Field',() => {
  page.navigateToPath('update');
  page.getElement('taskname').sendKeys('Task - Test 01');
  page.getElement('priority').sendKeys('05');
  page.getElement('Id').sendKeys('Parent Task - Test');
  page.getElement('startDate').sendKeys('01/12/2018');
  page.getElement('endDate').sendKeys('');
  let form = page.getElement('updateTaskForm').getAttribute('class');
  expect(form).toContain('ng-invalid');
});
it('should validate update Task Form for Default Inputs',() => {
  page.navigateToPath('update');
  page.getElement('taskname').sendKeys('');
  page.getElement('priority').sendKeys('15');
  page.getElement('Id').sendKeys('');
  page.getElement('startDate').sendKeys('');
  page.getElement('endDate').sendKeys('');
  let form = page.getElement('updateTaskForm').getAttribute('class');
  expect(form).toContain('ng-invalid');
});
it('should route to View Page on clicking Update Task Button for valid View task form',() => {
  page.navigateToPath('update');
  page.getElement('taskname').sendKeys('Task - Test 02');
  page.getElement('priority').sendKeys(25);
  page.getElement('Id').sendKeys('Parent Task - Test');
  page.getElement('startDate').sendKeys('31/12/2018');
  page.getElement('endDate').sendKeys('31/12/2018');
  let form = page.getElement('updateTaskForm').getAttribute('class');
  if(expect(form).toContain('ng-valid')){
    page.getElement('UpdateTaskButton').click().then(function (alertText){
      browser.wait(function(){
        return browser.switchTo().alert().then(
          function () {return true;},
          function () {return false;}
        );
      },3000);
      var popupAlert = browser.switchTo().alert();
      expect(popupAlert.getText()).toMatch('Task Updated Successfully...!!');
      // Close alert
      popupAlert.dismiss();
      });
    };
   expect(page.getElementByTagName('h4').getText()).toEqual('Search & Filter Tasks');
});
it('should route to View Page on clicking Cancel Task Button',() => {
  page.navigateToPath('update');
  page.getElement('CancelTaskButton').click();
  expect(page.getElementByTagName('h4').getText()).toEqual('Search & Filter Tasks');
});


});
