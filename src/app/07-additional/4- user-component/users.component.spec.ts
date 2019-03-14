import { UsersComponent } from './users.component'; 
import { UserService } from './user.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'; 

describe('UsersComponent', () => {
  let component: UsersComponent; 
  let service: UserService; 

  beforeEach(() => {
    service = new UserService(null);
    component = new UsersComponent(service);
  });

  it('should set users property with the users retrieved from the server', () => {
    let users = [ 1, 2, 3 ];
    spyOn(service, 'getUsers').and.returnValue(Observable.from([ users ]));

    component.ngOnInit();

    expect(component.users).toBe(users);
  });

  describe('When deleting a user', () => {
    let user; 

    beforeEach(() => {
      component.users = [
        { id: 1 },
        { id: 2 },
      ];

      user = component.users[0]; 
    });

    it('should remove the selected user from the list if the user confirms deletion', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(service, 'deleteUser').and.returnValue(Observable.empty());

      component.deleteUser(user);

      expect(component.users.indexOf(user)).toBe(-1);
    });

    it('should NOT remove the seleted user from the list if the user cancels', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.deleteUser(user);

      expect(component.users.indexOf(user)).toBeGreaterThan(-1);
    });

    it('should call the server to delete the selected user if the user confirms deletion', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      let spy = spyOn(service, 'deleteUser').and.returnValue(Observable.empty());

      component.deleteUser(user);

      expect(spy).toHaveBeenCalledWith(user.id);
    });

    it('should NOT call the server to delete the selected user if the user cancels', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      let spy = spyOn(service, 'deleteUser').and.returnValue(Observable.empty());

      component.deleteUser(user);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should undo deletion if the call to the server fails', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      // We need to change the implementation of alert, otherwise 
      // it will popup a dialog when running our unit tests.
      spyOn(window, 'alert').and.callFake(() => {}); 
      spyOn(service, 'deleteUser').and.returnValue(Observable.throw('error'));

      component.deleteUser(user);

      expect(component.users.indexOf(user)).toBeGreaterThan(-1);
    });
  
    it('should display an error if the call to the server fails', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      let spy = spyOn(window, 'alert').and.callFake(() => {}); 
      spyOn(service, 'deleteUser').and.returnValue(Observable.throw('error'));

      component.deleteUser(user);

      expect(spy).toHaveBeenCalled();
    });
  });
});