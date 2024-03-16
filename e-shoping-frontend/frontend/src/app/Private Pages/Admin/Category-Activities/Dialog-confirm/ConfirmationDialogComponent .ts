import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
selector: 'confirmation-dialog',
template: `
<h2 mat-dialog-title>Confirmation</h2>
<mat-dialog-content>{{ data.message }}</mat-dialog-content>
<mat-dialog-actions>
<button mat-button [mat-dialog-close]="true">Yes</button>
<button mat-button [mat-dialog-close]="false">No</button>
</mat-dialog-actions>
`
})
export class ConfirmationDialogComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}
