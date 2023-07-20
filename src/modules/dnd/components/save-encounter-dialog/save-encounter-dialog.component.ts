import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'sbx-save-encounter-dialog',
  templateUrl: './save-encounter-dialog.component.html',
  styleUrls: ['./save-encounter-dialog.component.scss']
})
export class SaveEncounterDialogComponent {
  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SaveEncounterDialogComponent>) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    })
  }

  ngAfterViewInit() {
    this.inputRef.nativeElement.focus();
  }

  submit() {
    if (this.form.invalid) { return; }

    this.dialogRef.close(this.form.get('name').value);
  }
}
