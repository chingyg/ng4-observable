import { Subject } from 'rxjs/Subject';

export class UsersService{

// Subject is both an observable and observer.
// Use Subject instead of EventEmitter from now on
userActivated = new Subject();
}