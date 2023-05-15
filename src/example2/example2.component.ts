import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DlhModalContainerComponent } from '../../src/dlh-modal-container/dlh-modal-container.component';
import { DLHModal } from './../../src/dlh-modal.class';

@Component({
  selector: 'app-example2',
  template: `
  <app-dlh-modal-container>
    <p mat-dialog-content>close automatically after 1s</p>
  </app-dlh-modal-container>`,
  imports: [CommonModule, DlhModalContainerComponent, MatDialogModule],
  standalone: true,
  styles: [
    `:host{
    poistion:relative
  }`,
  ],
})
export class Example2Component extends DLHModal<{ name: 'example2' }> {
  data!: { name: string };

  close(data?: { name: string } | undefined): void {
    this.dialogRef.close(data);
  }

  ngOnInit() {
    setTimeout(() => this.close({ name: 'Closed after 1s' }), 1000);
  }
}
