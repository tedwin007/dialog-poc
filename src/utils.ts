import { inject, Type } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { BehaviorSubject, Observer, switchMap, take, throwError } from 'rxjs';
import { BaseDlhModal } from './dlh-modal-container/dlh-modal';

export function initModalData() {
  let data = inject(MAT_DIALOG_DATA, { optional: true }) || {};
  data = { ...data };
  return new BehaviorSubject(data);
}
export function openModal(
  config: MatDialogConfig<any>,
  comp?: Type<any>,
  sideEffect?: Observer<any>
) {
  const dialogService = inject(MatDialog);
  return (obs?: Observer<any>, comp2?: any) => {
    const res = dialogService.open<BaseDlhModal<{}>>(comp2 || comp, config);
    res
      .afterOpened()
      .pipe(take(1))
      .subscribe(() => {
        res.componentInstance!.id = res.id;
        res.componentInstance!.dialogRef = res;
      });

    res
      .afterClosed()
      .pipe(
        take(1)
        // switchMap((err) => throwError(err))
      )
      .subscribe(obs || sideEffect);
    return res;
  };
}
