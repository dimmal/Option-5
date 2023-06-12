import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dnd-statblock-image',
  templateUrl: './statblock-image.component.html',
  styleUrls: ['./statblock-image.component.scss']
})
export class StatblockImageComponent {

  code: string;

  constructor(
    public dialogRef: MatDialogRef<StatblockImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
      this.code = data;
  }
}
