import 'zone.js/dist/zone';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ExampleComponent } from './example/example.component';
import { openModal } from './utils';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';
import { DlhModalContainerComponent } from './dlh-modal-container/dlh-modal-container.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule,
    DlhModalContainerComponent,
    ExampleComponent,
    MatDialogModule,
  ],
  template: `
    <button mat-button color="primary" (click)="onOpen()">on Open 1</button>
    <button (click)="onOpen2(sideEffect)">on Open 2</button>
    <button (click)="openWithTemplateRef()">on Open 3</button>
    
    <p>
      sent to modal:{{ modalInput | json }}
      <br>
      modal Returns: {{ response | json }}
    </p>

    <ng-template #temRef>
      <app-dlh-modal-container>
        <p mat-dialog-content>Template content without header</p>
        <div mat-dialog-actions>
          <button mat-button mat-dialog-close>Cancel</button>
          <button mat-button [mat-dialog-close]={} cdkFocusInitial>O.K</button>
        </div>
      </app-dlh-modal-container>
    </ng-template>

  `,
})
export class App {
  @ViewChild('temRef') temRef!: TemplateRef<any>;
  modalInput!: object;
  response!: object;

  sideEffect = {
    next: (data: any) => {
      console.log('next -> original data', this.dialogConfig.data);
      console.log('next -> returned data', data);
      this.modalInput = this.dialogConfig.data;
      this.response = data;
    },
    error: () => console.error('Error show'),
    complete: () => console.log('complate'),
  };
  dialogConfig: MatDialogConfig<any> = {
    maxWidth: '80vw',
    minHeight: '50vh',
    enterAnimationDuration: '300ms',
    exitAnimationDuration: '400ms',
    disableClose: false,
    direction: 'rtl',
    data: { name: 'original' },
  };

  // Example for using component factory - define the modal's ui and logic (inner component, shared logic, "static" logic)
  // in one place, adding it side effect (action - changing logic)
  onOpen = openModal(this.dialogConfig, ExampleComponent, this.sideEffect);

  // Example for using component factory - define the modal ui in a component, and the logic (actions) in another
  // good for reusability
  onOpen2 = openModal(
    { ...this.dialogConfig, direction: 'ltr' },
    Example2Component
  );

  // Example for using ng-template (define the modals ui and logic in the same place you call it)
  // good for special use cases (like revision dialog)
  onOpen3 = openModal({
    minWidth: '25vw',
    disableClose: true,
    hasBackdrop: true,
    enterAnimationDuration: '900ms',
    exitAnimationDuration: '700ms',
    position: { left: '10%' },
    minHeight: '40vh',
    data: { name: 'teddy' },
  });

  openWithTemplateRef() {
    (<any>(
      this.onOpen3(this.sideEffect, Example3Component).componentInstance
    )).temRef = this.temRef;
  }
}

bootstrapApplication(App);
