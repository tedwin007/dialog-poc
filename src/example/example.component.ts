import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DLHModal } from './../../src/dlh-modal.class';
import { DlhModalContainerComponent } from './../../src/dlh-modal-container/dlh-modal-container.component';

@Component({
  selector: 'app-example',
  template: `   
  <app-dlh-modal-container>
    <h1 mat-dialog-title>sdfs</h1>
    
    <div mat-dialog-content>
      <p>content</p>
    </div>

    <div mat-dialog-actions>
      <button mat-button mat-dialog-close align="end">Cancel</button>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>O.K</button>
    </div>
     
   </app-dlh-modal-container>`,
  standalone: true,
  styleUrls: ['./example.component.css'],
  imports: [CommonModule, DlhModalContainerComponent, MatDialogModule],
})
export class ExampleComponent extends DLHModal<{ name: string }> {
  data!: { name: string };

  ngOnInit() {
    this.data = this.getDataSnapshot();
    this.data.name = 'changed';
  }
}
