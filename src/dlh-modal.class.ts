import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { initModalData } from './utils';

export abstract class DLHModal<T = object> {
  private _data: BehaviorSubject<T> = initModalData();
  dialogService = inject(MatDialog);
  id: string = '';
  dialogRef: any = {};

  /**
   * returns a new "copy" of the data
   * that way, changes will not have effect on the component state,
   * meaning passing by ref can cuase unexpected side-effects)
   */
  getDataSnapshot(): T {
    return { ...this._data.getValue() };
  }

  getData$(): Observable<T> {
    return this._data.asObservable();
  }
}
