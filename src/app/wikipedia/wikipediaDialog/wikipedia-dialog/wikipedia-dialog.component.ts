import { Component, HostBinding, inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-wikipedia-dialog',
  standalone: true,
  imports: [],
  templateUrl: './wikipedia-dialog.component.html',
  styleUrl: './wikipedia-dialog.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class WikipediaDialogComponent {
  data = inject(MAT_DIALOG_DATA);

  @HostBinding('class.dialog-container') hostClass = true;
}
