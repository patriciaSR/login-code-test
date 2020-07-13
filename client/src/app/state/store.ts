import { BehaviorSubject, Observable } from 'rxjs';

export abstract class Store<T> {
    private state$: BehaviorSubject<T> = new BehaviorSubject(undefined);

    get = (): T => this.state$.getValue();

    get$ = (): Observable<T> => this.state$.asObservable();

    public store (nextState: T) {
      this.state$.next(nextState);
    }
}
