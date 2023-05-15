import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DLHModal } from './../../src/dlh-modal.class';
import { DlhModalContainerComponent } from './../../src/dlh-modal-container/dlh-modal-container.component';

@Component({
  selector: 'app-example3',
  template: `<ng-container *ngTemplateOutlet="temRef;context: context" ></ng-container>`,
  imports: [CommonModule, DlhModalContainerComponent, MatDialogModule],
  standalone: true,
})
export class Example3Component extends DLHModal<{ name: string }> {
  // there is no need for this component
  // POC only
  @Input('temRef') temRef!: TemplateRef<any>;
  @Input('context') context: any;
}
